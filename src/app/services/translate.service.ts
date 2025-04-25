import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private langs = ['en', 'de'];
  
  constructor(private translate: TranslateService) {}

  initializeTranslation(): void {
    this.translate.addLangs(this.langs);
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && this.langs.includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const userLanguage = browserLang && this.langs.includes(browserLang) ? browserLang : 'en';
      this.translate.use(userLanguage);
      localStorage.setItem('preferredLanguage', userLanguage);
    }
  }

  switchLanguage(lang: string): void {
    if (this.langs.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  }

  getCurrentLang(): string {
    return this.translate.currentLang || localStorage.getItem('preferredLanguage') || 'en';
  }

  getTranslation(key: string): string {
    let translation = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }
}