import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://dennis-dumin.net/sendMail.php';
  
  constructor(private http: HttpClient) {}
  
  sendEmail(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}