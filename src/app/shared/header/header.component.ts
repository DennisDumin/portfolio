import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../app/services/translate.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Language = Language;
  private readonly MOBILE_BREAKPOINT = 700;
  isLogoHovered = false;
  isGermanActive = false;
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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.translationService.initializeTranslation();
    const currentLang = this.translationService.getCurrentLang();
    this.isGermanActive = currentLang === Language.GERMAN;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const fragment = this.router.getCurrentNavigation()?.extras.fragment;
      if (fragment) {
        this.scrollToElement(fragment);
      }
    });
  }

  scrollToElement(anchor: string): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToSection(anchor: string): void {
    if (this.router.url !== '/' && this.router.url !== '/home') {
      this.router.navigate(['/'], { fragment: anchor });
    } else {
      this.scrollToElement(anchor);
    }
    this.closeMobileMenu();
  }

  switchLanguage(language: Language): void {
    this.translationService.switchLanguage(language);
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