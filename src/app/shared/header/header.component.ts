import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../app/services/translate.service';

interface NavigationItem {
  anchor: string;
  translationKey: string;
}

enum Language {
  ENGLISH = 'en',
  GERMAN = 'de'
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Language = Language;
  
  private readonly MOBILE_BREAKPOINT = 700;
  
  isLogoHovered = false;
  isGermanActive = true;
  activeNavItemIndex: number | null = null;
  isMobileMenuOpen = false;
  viewportWidth = 0;

  navigationItems: NavigationItem[] = [
    {
      anchor: 'aboutMe',
      translationKey: 'header.about_me',
    },
    {
      anchor: 'skills',
      translationKey: 'header.skills',
    },
    {
      anchor: 'projects',
      translationKey: 'header.projects',
    },
  ];

  constructor(
    private translationService: TranslationService, 
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportWidth = window.innerWidth;
    }
    
    this.translationService.initializeTranslation();
  }  

  switchLanguage(language: Language): void {
    this.translateService.use(language);
    this.isGermanActive = language === Language.GERMAN;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  setNavItemActive(index: number): void {
    this.activeNavItemIndex = index;
  }

  clearActiveNavItem(): void {
    this.activeNavItemIndex = null;
  }

  setLogoHovered(isHovered: boolean): void {
    this.isLogoHovered = isHovered;
  }

  get isDesktopView(): boolean {
    return this.viewportWidth > this.MOBILE_BREAKPOINT;
  }

  @HostListener('window:resize')
  onViewportResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportWidth = window.innerWidth;
      
      if (this.isDesktopView) {
        this.closeMobileMenu();
      }
    }
  }

  @HostListener('wheel', ['$event'])
  preventScrollWhenMenuOpen(event: WheelEvent): void {
    if (this.isMobileMenuOpen) {
      event.preventDefault();
    }
  }
   
  @HostListener('touchmove', ['$event'])
  preventTouchWhenMenuOpen(event: TouchEvent): void {
    if (this.isMobileMenuOpen) {
      event.preventDefault();
    }
  }
}