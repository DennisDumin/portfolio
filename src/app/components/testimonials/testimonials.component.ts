import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TranslatePipe,
    ScrollAnimateDirective,
  ],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    { text: 'testimonials.quotes.björn', author: 'Björn M.', role: 'Project Partner' },
    { text: 'testimonials.quotes.robert', author: 'Robert K.', role: 'Project Partner' },
    { text: 'testimonials.quotes.markus', author: 'Markus S.', role: 'Frontend Developer' },
  ];

  currentIndex = 0;
  
  mainCard: Testimonial = this.testimonials[0];
  previousCard: Testimonial = this.testimonials[this.testimonials.length - 1];
  nextCard: Testimonial = this.testimonials[1];
  incomingCard: Testimonial = this.testimonials[0];
  
  showPrev = false;
  showNext = false;
  viewportWidth = window.innerWidth;

  constructor(translationService: TranslationService) {
    translationService.initializeTranslation();
  }

  ngOnInit(): void {
    this.updateCards();
  }

  getPreviousIndex(index: number): number {
    return (index - 1 + this.testimonials.length) % this.testimonials.length;
  }

  getNextIndex(index: number): number {
    return (index + 1) % this.testimonials.length;
  }

  updateCards(): void {
    this.mainCard = this.testimonials[this.currentIndex];
    this.previousCard = this.testimonials[this.getPreviousIndex(this.currentIndex)];
    this.nextCard = this.testimonials[this.getNextIndex(this.currentIndex)];
  }

  navigateToPrevious(): void {
    if (this.showPrev || this.showNext) return;
    
    if (this.viewportWidth < 850) {
      this.currentIndex = this.getPreviousIndex(this.currentIndex);
      return this.updateCards();
    }
    
    this.incomingCard = this.testimonials[this.getPreviousIndex(this.getPreviousIndex(this.currentIndex))];
    
    this.showPrev = true;
    setTimeout(() => {
      this.currentIndex = this.getPreviousIndex(this.currentIndex);
      this.updateCards();
      this.showPrev = false;
    }, 500);
  }

  navigateToNext(): void {
    if (this.showPrev || this.showNext) return;
    
    if (this.viewportWidth < 850) {
      this.currentIndex = this.getNextIndex(this.currentIndex);
      return this.updateCards();
    }
    this.incomingCard = this.testimonials[this.getNextIndex(this.getNextIndex(this.currentIndex))];
    
    this.showNext = true;
    
    setTimeout(() => {
      this.currentIndex = this.getNextIndex(this.currentIndex);
      this.updateCards();
      this.showNext = false;
    }, 500);
  }

  goToSlide(index: number): void {
    if (this.showPrev || this.showNext || index === this.currentIndex) return;
    
    if (this.viewportWidth < 850) {
      this.currentIndex = index;
      return this.updateCards();
    }
    
    const diff = (index - this.currentIndex + this.testimonials.length) % this.testimonials.length;
    const goForward = diff <= this.testimonials.length / 2;
    
    if (goForward) {
      this.incomingCard = this.testimonials[(index + 1) % this.testimonials.length];
      this.showNext = true;
      
      setTimeout(() => {
        this.currentIndex = index;
        this.updateCards();
        this.showNext = false;
      }, 500);
    } else {
      this.incomingCard = this.testimonials[(index - 1 + this.testimonials.length) % this.testimonials.length];
      this.showPrev = true;
      
      setTimeout(() => {
        this.currentIndex = index;
        this.updateCards();
        this.showPrev = false;
      }, 500);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewportWidth = window.innerWidth;
  }
}