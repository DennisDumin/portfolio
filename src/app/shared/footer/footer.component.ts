import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  logoActive = false;
  activeLink: number | null = null;
  viewportWidth = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportWidth = window.innerWidth;
    }
  }
  
  socialLinks = [
    {
      url: 'https://github.com/DennisDumin',
      label: 'GitHub',
      external: true
    },
    {
      url: 'https://www.linkedin.com/in/dennis-dumin-4a74b9349/',
      label: 'LinkedIn',
      external: true
    },
    {
      url: 'mailto:contact@dennis-dumin.net',
      label: 'footer.email',
      external: true
    },
    {
      url: '/legal-notice',
      label: 'footer.legal_notice',
      external: false
    },
  ];

  @HostListener('window:resize')
  onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportWidth = window.innerWidth;
    }
  }

  activateLink(index: number) {
    this.activeLink = index;
  }

  deactivateLink() {
    this.activeLink = null;
  }
  
  toggleLogoState(state: boolean) {
    this.logoActive = state;
  }
}
