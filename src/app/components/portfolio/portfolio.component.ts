import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';
import { ModalService, WorkItem } from '../../services/modal.service';
import { ProjectModalComponent } from './portfolio.modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TranslatePipe,
    ScrollAnimateDirective,
    ProjectModalComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit, OnDestroy {
  hoverIndex: number | null = null;
  activeIndex: number = 0;
  windowWidth = 0;
  private nextWorkListener: any;

  works: WorkItem[] = [
    {
      title: 'Videoflix',
      groupLabel: 'projects.backend_group',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
      image: 'videoflix',
      format: '.svg',
      description: 'project_dialog.description_videoflix',
      role: 'project_dialog.role_backend',
      contribution: 'project_dialog.contribution_videoflix',
      links: [
        {
          label: 'buttons.backend_github',
          url: 'https://github.com/DennisDumin/videoflix_backend',
        },
        {
          label: 'buttons.frontend_template',
          url: 'https://github.com/Developer-Akademie-Backendkurs/project.Videoflix',
        },
      ],
    },
    {
      title: 'Quizly',
      technologies: ['Python', 'Django', 'Whisper', 'Gemini', 'REST API'],
      image: 'quizly',
      format: '.svg',
      description: 'project_dialog.description_quizly',
      role: 'project_dialog.role_backend',
      contribution: 'project_dialog.contribution_quizly',
      links: [
        {
          label: 'buttons.backend_github',
          url: 'https://github.com/DennisDumin/quizly_backend',
        },
        {
          label: 'buttons.frontend_template',
          url: 'https://github.com/Developer-Akademie-Backendkurs/project.Quizly',
        },
      ],
    },
    {
      title: 'Coderr',
      technologies: ['Python', 'Django', 'REST API', 'RBAC'],
      image: 'coderr',
      format: '.svg',
      description: 'project_dialog.description_coderr',
      role: 'project_dialog.role_backend',
      contribution: 'project_dialog.contribution_coderr',
      links: [
        {
          label: 'buttons.backend_github',
          url: 'https://github.com/DennisDumin/coderr_backend',
        },
        {
          label: 'buttons.frontend_template',
          url: 'https://github.com/Developer-Akademie-Backendkurs/project.Coderr',
        },
      ],
    },
    {
      title: 'KanMind',
      technologies: ['Python', 'Django', 'REST API', 'Permissions'],
      image: 'kanmind',
      format: '.svg',
      description: 'project_dialog.description_kanmind',
      role: 'project_dialog.role_backend',
      contribution: 'project_dialog.contribution_kanmind',
      links: [
        {
          label: 'buttons.backend_github',
          url: 'https://github.com/DennisDumin/KanMind',
        },
        {
          label: 'buttons.frontend_template',
          url: 'https://github.com/Developer-Akademie-Backendkurs/project.KanMind',
        },
      ],
    },
    {
      title: 'Join',
      groupLabel: 'projects.frontend_group',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      image: 'join',
      format: '.png',
      description: 'project_dialog.description_join',
      role: 'project_dialog.role_frontend_team',
      contribution: 'project_dialog.contribution_join',
      links: [
        {
          label: 'buttons.github',
          url: 'https://github.com/DennisDumin/join',
        },
        {
          label: 'buttons.live_test',
          url: 'https://dennis-dumin.net/projects/join/',
        },
      ],
    },
    {
      title: 'El Pollo Loco',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'el-pollo-loco',
      thumbnail: 'el-pollo-loco-thumbnail',
      format: '.svg',
      description: 'project_dialog.description_el_pollo_loco',
      role: 'project_dialog.role_frontend',
      contribution: 'project_dialog.contribution_el_pollo_loco',
      links: [
        {
          label: 'buttons.github',
          url: 'https://github.com/DennisDumin/el-pollo-loco',
        },
        {
          label: 'buttons.live_test',
          url: 'https://dennis-dumin.net/projects/el-pollo-loco/',
        },
      ],
    },
  ];

  constructor(
    translationService: TranslationService,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translationService.initializeTranslation();
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
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
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
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
