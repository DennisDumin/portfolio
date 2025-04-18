import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';
import { HeroSectionComponent } from '../hero/hero.component';
import { SkillsComponent } from "../skills/skills.component";
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { TestimonialsComponent } from "../testimonials/testimonials.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TranslatePipe,
    ScrollAnimateDirective,
    HeroSectionComponent,
    SkillsComponent,
    PortfolioComponent,
    TestimonialsComponent,
],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements OnInit {
  descriptions = [
    {
      text: 'about_me.description_1',
      image: 'location',
    },
    {
      text: 'about_me.description_2',
      image: 'cognition',
    },
    {
      text: 'about_me.description_3',
      image: 'check',
    },
  ];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.initializeTranslation();
  }
}