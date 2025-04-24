import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated: string = '2023-04-24';
  
  constructor(
    private translationService: TranslationService,
    private metaService: Meta,
    private titleService: Title
  ) {
    translationService.initializeTranslation();
  }
  
  ngOnInit() {
    this.titleService.setTitle('Datenschutzerklärung - Dennis Dumin');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Datenschutzerklärung für die Website von Dennis Dumin. Erfahren Sie, wie Ihre Daten geschützt werden.'
    });
  }
}