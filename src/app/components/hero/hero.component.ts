import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';
import { TranslationService } from '../../services/translate.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface NavigationLink {
  id: string;
  anchor: string;
  labelKey: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface MarqueeItem {
  textKey: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isEmailHovered = false;
  hoveredSocialIndex: number | null = null;
  screenWidth = 0;
  navigationLinks: NavigationLink[] = [
    {
      id: 'projects-link',
      anchor: 'projects',
      labelKey: 'hero.nav.projects'
    },
    {
      id: 'contact-link',
      anchor: 'contact',
      labelKey: 'hero.nav.contact'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/DennisDumin'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/dennis-dumin-4a74b9349/'
    }
  ];
  
  marqueeItems: MarqueeItem[] = [
    { textKey: 'hero.marquee.frontend' },
    { textKey: 'hero.marquee.city' },
    { textKey: 'hero.marquee.remote' },
    { textKey: 'hero.marquee.pixel' }
  ];

  constructor(
    private animationService: AnimationService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.translationService.initializeTranslation();
    
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  animateLink(elementId: string, maxLeft: number, startRight: number): void {
    this.animationService.startAnimation(elementId, maxLeft, startRight);
  }
  
  stopLinkAnimation(elementId: string): void {
    this.animationService.stopAnimation(elementId);
  }
  
  getLinkPosition(elementId: string): number {
    return this.animationService.getAnimationPosition(elementId);
  }
}