import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TranslateModule, TranslatePipe, CommonModule, RouterModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  socialProfiles = [
    {
      url: 'https://github.com/DennisDumin',
      label: 'GitHub'
    },
    {
      url: 'https://www.linkedin.com/in/dennis-dumin-4a74b9349/',
      label: 'LinkedIn'
    }
  ];
  
  pageYear: number = new Date().getFullYear();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.initializeTranslation();
    document.title = 'Legal Notice - Dennis Dumin';
  }
}