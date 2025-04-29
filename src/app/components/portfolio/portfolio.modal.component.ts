import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ModalService, WorkItem } from '../../services/modal.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-button" (click)="closeModal()">
          <img src="assets/img/portfolio/close.png" alt="close">
        </button>

        <div class="work-details" *ngIf="workItem">
          <h6>{{ (currentIndex + 1) < 10 ? '0' + (currentIndex + 1) : currentIndex + 1 }}</h6>
          <span class="content-title">{{ workItem.title }}</span>
          <span class="content-headline">{{ 'project_dialog.question' | translate }}</span>
          <span class="content-description">{{ workItem.description | translate }}</span>

          <div class="tech-stack">
            <div class="tech-item" *ngFor="let tech of workItem.technologies">
              <img [src]="'assets/img/portfolio/' + tech.toLowerCase() + '.png'" alt="technology">
              <span>{{ tech }}</span>
            </div>
          </div>

          <div class="work-links" *ngIf="workItem.links && workItem.links.length > 0">
            <a *ngIf="workItem.links[0]" [href]="workItem.links[0]" target="_blank" class="link-button">
              Github <img src="assets/img/portfolio/arrow-outward-green.png" alt="">
            </a>
            <a *ngIf="workItem.links[1]" [href]="workItem.links[1]" target="_blank" class="link-button">
              Live Test <img src="assets/img/portfolio/arrow-outward-green.png" alt="">
            </a>
          </div>
        </div>

        <div class="work-image" *ngIf="workItem">
          <div>
            <img class="showcase-image" [src]="'assets/img/portfolio/' + workItem.image + workItem.format" alt="">
          </div>
          
          <button class="next-button" (click)="nextWorkRequested()">
            Next Project <img src="assets/img/portfolio/arrow-right.png" alt="">
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./portfolio-modal.component.scss']
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  workItem: WorkItem | null = null;
  currentIndex = 0;
  private subscriptions: Subscription[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.modalService.isOpen$.subscribe(isOpen => {
        this.isOpen = isOpen;
      })
    );

    this.subscriptions.push(
      this.modalService.workItem$.subscribe(work => {
        if (work) {
          this.workItem = work;
          this.currentIndex = work.index || 0;
        }
      })
    );

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  nextWorkRequested(): void {
    document.dispatchEvent(new CustomEvent('nextWorkRequested'));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeModal();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: Event): void {
    if (this.isOpen) {
      event.stopPropagation();
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isOpen) {
      const modalContent = event.target as Element;
      if (!modalContent.closest('.modal-content')) {
        event.preventDefault();
      }
    }
  }
}