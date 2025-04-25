import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  logoActive = false;
  activeLink: number | null = null;
  viewportWidth = window.innerWidth;
  
  socialLinks = [
    {
      url: 'https://github.com/DennisDumin',
      label: 'Github',
      external: true
    },
    {
      url: 'https://www.linkedin.com/in/dennis-dumin-4a74b9349/',
      label: 'LinkedIn',
      external: true
    },
    {
      url: 'mailto:contact@dennis-dumin.net',
      label: 'Email',
      external: true
    },
    {
      url: 'legal-notice',
      label: 'Legal Notice',
      external: false
    },
  ];

  @HostListener('window:resize')
  onWindowResize() {
    this.viewportWidth = window.innerWidth;
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