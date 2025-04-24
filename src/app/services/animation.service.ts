import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animations: Map<string, { 
    active: boolean; 
    position: number; 
    lastUpdate: number;
    properties?: any;
  }> = new Map();

  private animationFrames: Map<string, number> = new Map();
  marqueeLinkX: any;
  
  constructor(private ngZone: NgZone) {}
  startAnimation(elementId: string, maxXLeft: number, xRight: number, speed: number = 40): void {
    this.stopAnimation(elementId);
    
    this.animations.set(elementId, { 
      active: true, 
      position: 0,
      lastUpdate: performance.now()
    });

    const animate = (timestamp: number) => {
      const current = this.animations.get(elementId);
      if (!current || !current.active) return;

      const deltaTime = timestamp - current.lastUpdate;
      
      if (deltaTime > speed) {
        current.position -= 3;
        if (current.position < -300) {
          current.position = 200;
        }
        
        current.lastUpdate = timestamp;
        this.animations.set(elementId, { ...current });
      }

      const frameId = requestAnimationFrame(animate);
      this.animationFrames.set(elementId, frameId);
    };

    const frameId = requestAnimationFrame(animate);
    this.animationFrames.set(elementId, frameId);
  }

  startMarqueeAnimation(containerId: string, speed: number = 1): void {
    this.stopAnimation(containerId);
    
    this.ngZone.runOutsideAngular(() => {
      const container = document.querySelector('.hero__marquee-container') as HTMLElement;
      const content = document.querySelector('.hero__marquee-content') as HTMLElement;
      if (!container || !content) return;
      
      content.style.animation = 'none';
      
      const wrapper = document.createElement('div');
      wrapper.style.display = 'inline-flex';
      wrapper.style.whiteSpace = 'nowrap';
      
      content.parentNode?.insertBefore(wrapper, content);
      wrapper.appendChild(content);
      
      const clone = content.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.style.animation = 'none';
      wrapper.appendChild(clone);

      const originalWidth = content.offsetWidth;

      let startTime: number | null = null;
      let pixelsPerSecond = speed * 60;
      
      this.animations.set(containerId, {
        active: true,
        position: 0,
        lastUpdate: performance.now(),
        properties: {
          originalWidth,
          wrapper,
          contentElement: content,
          cloneElement: clone
        }
      });
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        
        const current = this.animations.get(containerId);
        if (!current || !current.active) {
          if (wrapper.parentNode) {
            wrapper.parentNode.insertBefore(content, wrapper);
            wrapper.remove();
          }
          return;
        }

        const elapsedTime = timestamp - startTime;
        const elapsedSeconds = elapsedTime / 1000;
        const totalPixels = elapsedSeconds * pixelsPerSecond;

        const position = -(totalPixels % originalWidth);

        wrapper.style.transform = `translateX(${position}px)`;
        
        const frameId = requestAnimationFrame(animate);
        this.animationFrames.set(containerId, frameId);
      };
      
      const frameId = requestAnimationFrame(animate);
      this.animationFrames.set(containerId, frameId);
    });
  }

  stopAnimation(elementId: string): void {
    const current = this.animations.get(elementId);

    if (current?.properties?.wrapper) {
      const wrapper = current.properties.wrapper;
      const content = current.properties.contentElement;
      
      if (wrapper.parentNode) {
        wrapper.parentNode.insertBefore(content, wrapper);
        wrapper.remove();
      }
    }
    
    const frameId = this.animationFrames.get(elementId);
    if (frameId) {
      cancelAnimationFrame(frameId);
      this.animationFrames.delete(elementId);
    }

    this.animations.set(elementId, { 
      active: false, 
      position: 0, 
      lastUpdate: 0
    });
  }

  getAnimationPosition(elementId: string): number {
    return this.animations.get(elementId)?.position || 0;
  }
}