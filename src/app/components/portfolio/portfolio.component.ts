import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';

interface WorkItem {
  title: string;
  technologies: string[];
  image: string;
  thumbnail?: string;
  format: string;
  description: string;
  links: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TranslatePipe,
    ScrollAnimateDirective,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  showModal = false;
  hoverIndex: number | null = null;
  activeIndex: number = 0;
  windowWidth = window.innerWidth;

  works: WorkItem[] = [
    {
      title: 'Join',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      image: 'join',
      format: '.png',
      description: 'project_dialog.description_join',
      links: [
        'https://github.com/DennisDumin/join',
        'https://dennis-dumin.net/projects/join/',
      ],
    },
    {
      title: 'El Pollo Loco',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'el-pollo-loco',
      thumbnail: 'el-pollo-loco-thumbnail',
      format: '.svg',
      description: 'project_dialog.description_el_pollo_loco',
      links: [
        'https://github.com/DennisDumin/el_pollo_loco',
        'https://dennis-dumin.net/projects/el_pollo_loco/',
      ],
    },
    {
      title: 'DA Bubble',
      technologies: ['Angular', 'Firebase', 'TypeScript'],
      image: 'da-bubble',
      format: '.svg',
      description: 'project_dialog.description_da_bubble',
      links: [],
    },
  ];

  constructor(translationService: TranslationService) {
    translationService.initializeTranslation();
  }

  handleMouseEnter(index: number) {
    this.hoverIndex = index;
  }

  handleMouseLeave() {
    this.hoverIndex = null;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: Event) {
    if (this.showModal) event.preventDefault();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.showModal) {
      event.preventDefault();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  openModal(index: number) {
    this.showModal = true;
    this.activeIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = ''; 
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  nextWork() {
    this.activeIndex = (this.activeIndex + 1) % this.works.length;
  }

  formatTitle(title: string): string {
    return title.replace(/\s+/g, '-').toLowerCase();
  }
}