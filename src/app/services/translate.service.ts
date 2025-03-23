import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private langs = ['en', 'de'];
  
  constructor(private translate: TranslateService) {}

  initializeTranslation(): void {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    const userLanguage = browserLang && this.langs.includes(browserLang) ? browserLang : 'de';
    this.translate.use(userLanguage);
  }

  switchLanguage(lang: string): void {
    if (this.langs.includes(lang)) {
      this.translate.use(lang);
    }
  }

  getTranslation(key: string): string {
    let translation = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }
}