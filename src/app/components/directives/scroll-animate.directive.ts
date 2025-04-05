import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit {
  @Input('appScrollAnimate') animationType: string | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setupObserver();
  }

  private setupObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (this.animationType) {
            this.el.nativeElement.classList.add(this.animationType);
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }
}