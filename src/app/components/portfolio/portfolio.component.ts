import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';
import { ModalService, WorkItem } from '../../services/modal.service'; 

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
export class PortfolioComponent implements OnInit, OnDestroy {
  hoverIndex: number | null = null;
  activeIndex: number = 0;
  windowWidth = window.innerWidth;
  private nextWorkListener: any;

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
        'https://github.com/DennisDumin/el-pollo-loco',
        'https://dennis-dumin.net/projects/el-pollo-loco/',
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

  constructor(
    translationService: TranslationService,
    private modalService: ModalService
  ) {
    translationService.initializeTranslation();
  }

  ngOnInit() {
    this.nextWorkListener = () => this.nextWork();
    document.addEventListener('nextWorkRequested', this.nextWorkListener);
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    document.removeEventListener('nextWorkRequested', this.nextWorkListener);
  }

  handleMouseEnter(index: number) {
    this.hoverIndex = index;
  }

  handleMouseLeave() {
    this.hoverIndex = null;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  openModal(index: number) {
    this.activeIndex = index;

    const work = {
      ...this.works[index],
      index
    };

    this.modalService.openModal(work);
  }

  nextWork() {
    this.activeIndex = (this.activeIndex + 1) % this.works.length;
    const nextWork = {
      ...this.works[this.activeIndex], 
      index: this.activeIndex
    };
    this.modalService.nextWork(nextWork);
  }

  formatTitle(title: string): string {
    return title.replace(/\s+/g, '-').toLowerCase();
  }
}