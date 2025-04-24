import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  Injector,
  ViewChild,
  afterNextRender,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { TranslationService } from '../../services/translate.service';
import { AnimationService } from '../../services/animation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    ScrollAnimateDirective,
    RouterModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private _injector = inject(Injector);
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  
  private readonly BUTTON_ANIMATION_ID = 'contactSubmitButton';
  
  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      { injector: this._injector }
    );
  }

  constructor(
    private animationService: AnimationService,
    translationService: TranslationService
  ) {
    translationService.initializeTranslation();
  }
  
  ngOnInit() {
    this.animationService.stopAnimation(this.BUTTON_ANIMATION_ID);
  }
  submitButtonText: string = 'contact.send_button';
  formData = {
    userName: '',
    userEmail: '',
    userMessage: '',
  };

  privacyConsent: boolean = false;
  
  get privacyImage(): string {
    return this.privacyConsent
      ? 'assets/img/icons/checkbox-checked.png'
      : 'assets/img/icons/checkbox.png';
  }

  togglePrivacyConsent() {
    this.privacyConsent = !this.privacyConsent;
  }

  http = inject(HttpClient);
  testMode = false;
  showSuccessModal = false;
  isSubmitting = false;
  
  apiConfig = {
    endpoint: 'https://dennis-dumin.net/sendMail.php',
    body: (payload: any) => JSON.stringify({
      name: payload.userName,   
      email: payload.userEmail, 
      message: payload.userMessage
    }),
    headers: {
      'Content-Type': 'application/json',
      responseType: 'json',
    },
  };

  submitForm(form: NgForm) {
    if (form.submitted && form.form.valid && this.privacyConsent) {
      // Prevent duplicate submissions
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      
      if (this.testMode) {
        form.resetForm();
        this.privacyConsent = false;
        this.showSuccessModal = true;
        this.isSubmitting = false;
        return;
      }
      
      this.http
        .post(this.apiConfig.endpoint, this.apiConfig.body(this.formData))
        .subscribe({
          next: (response: any) => {
            console.log('Form submitted successfully:', response);
            form.resetForm();
            this.privacyConsent = false;
            this.showSuccessModal = true;
            setTimeout(() => {
              this.showSuccessModal = false;
            }, 8000);
          },
          error: (error) => {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again later.');
          },
          complete: () => {
            console.info('Form submission completed');
            this.isSubmitting = false;
          },
        });
    }
  }

  startButtonAnimation(content: string, maxXLeft: number, xRight: number) {
    this.animationService.startAnimation(this.BUTTON_ANIMATION_ID, maxXLeft, xRight);
  }

  stopButtonAnimation(content: string) {
    this.animationService.stopAnimation(this.BUTTON_ANIMATION_ID);
  }

  getButtonPosition(content: string): number {
    return this.animationService.getAnimationPosition(this.BUTTON_ANIMATION_ID);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: Event) {
    if (this.showSuccessModal) event.preventDefault();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.showSuccessModal) {
      event.preventDefault();
    }
  }
  
  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }
}