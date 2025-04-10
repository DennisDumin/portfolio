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
  
  isPopupVisible: boolean = false;
  
  skillsList: Skill[] = [
    { icon: 'html', name: 'HTML' },
    { icon: 'css', name: 'CSS' },
    { icon: 'javascript', name: 'JavaScript' },
    { icon: 'materialdesign', name: 'Material Design' },
    { icon: 'typescript', name: 'TypeScript' },
    { icon: 'angular', name: 'Angular' },
    { icon: 'firebase', name: 'Firebase' },
    { icon: 'git', name: 'Git' },
    { icon: 'api', name: 'Rest-Api' },
    { icon: 'scrum', name: 'Scrum' },
    { icon: 'growth', name: 'Growth mindset' },
  ];
  
  interestsList: Skill[] = [
    { icon: 'react', name: 'React' },
    { icon: 'vue', name: 'Vue Js' },
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
  
  toggleInterestsPopup(index: number): void {
    if (index === this.skillsList.length - 1) {
      this.isPopupVisible = !this.isPopupVisible;
    }
  }
}