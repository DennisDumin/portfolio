import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';

interface Skill {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ScrollAnimateDirective,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  readonly contactLinkKey: string = 'skill.link';

  skillsList: Skill[] = [
    { icon: 'html', name: 'HTML' },
    { icon: 'css', name: 'SCSS' },
    { icon: 'javascript', name: 'JavaScript' },
    { icon: 'typescript', name: 'TypeScript' },
    { icon: 'angular', name: 'Angular' },
    { icon: 'python', name: 'Python' },
    { icon: 'django', name: 'Django' },
    { icon: 'api', name: 'REST API' },
    { icon: 'postgresql', name: 'PostgreSQL' },
    { icon: 'redis', name: 'Redis' },
    { icon: 'docker', name: 'Docker' },
    { icon: 'git', name: 'Git' },
  ];

  constructor(
    private animationService: AnimationService,
    private translationService: TranslationService
  ) {}
  
  ngOnInit(): void {
    this.translationService.initializeTranslation();
  }

  startLinkAnimation(contentKey: string, maxXLeft: number, xRight: number): void {
    this.animationService.startAnimation(contentKey, maxXLeft, xRight);
  }

  stopLinkAnimation(contentKey: string): void {
    this.animationService.stopAnimation(contentKey);
  }

  getLinkPosition(contentKey: string): number {
    return this.animationService.getAnimationPosition(contentKey);
  }
}
