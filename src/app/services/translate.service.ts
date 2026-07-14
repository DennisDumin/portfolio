import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private langs = ['en', 'de'];
  
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  initializeTranslation(): void {
    this.translate.addLangs(this.langs);
    this.translate.setDefaultLang('en');
    if (!isPlatformBrowser(this.platformId)) {
      this.translate.use('en');
      return;
    }

    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = this.translate.getBrowserLang();
    const language = savedLang && this.langs.includes(savedLang)
      ? savedLang
      : browserLang && this.langs.includes(browserLang)
        ? browserLang
        : 'en';

    this.translate.use(language);
    this.document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);
  }

  switchLanguage(lang: string): void {
    if (this.langs.includes(lang)) {
      this.translate.use(lang);
      this.document.documentElement.lang = lang;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('preferredLanguage', lang);
      }
    }
  }

  getCurrentLang(): string {
    const savedLanguage = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('preferredLanguage')
      : null;
    return this.translate.currentLang || savedLanguage || 'en';
  }

  getTranslation(key: string): string {
    let translation = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }
}
