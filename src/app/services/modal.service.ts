import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WorkItem {
  title: string;
  technologies: string[];
  image: string;
  thumbnail?: string;
  format: string;
  description: string;
  links: string[];
  index?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();
  private workItemSubject = new BehaviorSubject<WorkItem | null>(null);
  workItem$ = this.workItemSubject.asObservable();

  openModal(work: WorkItem): void {
    this.workItemSubject.next(work);
    this.isOpenSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isOpenSubject.next(false);
    document.body.style.overflow = ''; 
  }

  nextWork(work: WorkItem): void {
    this.workItemSubject.next(work);
  }
}