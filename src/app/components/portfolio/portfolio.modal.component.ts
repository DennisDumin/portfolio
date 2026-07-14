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
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"
        (click)="$event.stopPropagation()">
        <button class="close-button" (click)="closeModal()" [attr.aria-label]="'buttons.close' | translate">
          <img src="assets/img/portfolio/close.png" alt="">
        </button>

        <div class="work-details" *ngIf="workItem">
          <div class="project-meta">
            <span class="project-number" aria-hidden="true">{{ (currentIndex + 1) < 10 ? '0' + (currentIndex + 1) : currentIndex + 1 }}</span>
            <span class="project-role">{{ workItem.role | translate }}</span>
          </div>
          <h2 id="project-dialog-title" class="content-title">{{ workItem.title }}</h2>
          <span class="content-headline">{{ 'project_dialog.question' | translate }}</span>
          <span class="content-description">{{ workItem.description | translate }}</span>

          <div class="contribution-note">
            <strong>{{ 'project_dialog.contribution_label' | translate }}</strong>
            <span>{{ workItem.contribution | translate }}</span>
          </div>

          <div class="tech-stack">
            <div class="tech-item" *ngFor="let tech of workItem.technologies">
              <span>{{ tech }}</span>
            </div>
          </div>

          <div class="work-links" *ngIf="workItem.links && workItem.links.length > 0">
            <a *ngFor="let link of workItem.links" [href]="link.url" target="_blank" rel="noopener noreferrer"
              class="link-button">
              {{ link.label | translate }} <img src="assets/img/portfolio/arrow-outward-green.png" alt="">
            </a>
          </div>
        </div>

        <div class="work-image" *ngIf="workItem">
          <div>
            <img class="showcase-image" [src]="'assets/img/portfolio/' + workItem.image + workItem.format"
              [alt]="workItem.title + ' - ' + ('projects.preview' | translate)">
          </div>
          
          <button class="next-button" (click)="nextWorkRequested()">
            {{ 'project_dialog.next_project' | translate }} <img src="assets/img/portfolio/arrow-right.png" alt="">
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

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    this.modalService.closeModal();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  nextWorkRequested(): void {
    document.dispatchEvent(new CustomEvent('nextWorkRequested'));
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen) this.closeModal();
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
