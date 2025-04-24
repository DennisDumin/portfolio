<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    if (!$params || !isset($params->email) || !isset($params->name) || !isset($params->message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }
    
    if (!filter_var($params->email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
    $name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8');
    
    $recipient = 'contact@dennis-dumin.net';
    $subject = "Kontaktformular: $name <$email>";
    $emailBody = "
        <html>
        <head><title>Neue Kontaktanfrage</title></head>
        <body>
            <h3>Neue Nachricht von $name</h3>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Nachricht:</strong></p>
            <p>" . nl2br($message) . "</p>
        </body>
        </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: Dennis Dumin Website <noreply@dennis-dumin.net>',
        'Reply-To: ' . $email
    ];
    
    $mailSent = mail($recipient, $subject, $emailBody, implode("\r\n", $headers));
    
    if ($mailSent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        throw new Exception('Email could not be sent');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}