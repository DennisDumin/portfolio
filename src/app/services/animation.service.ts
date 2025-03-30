import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animations: Map<string, { 
    active: boolean; 
    position: number; 
    lastUpdate: number;
  }> = new Map();
  private animationFrames: Map<string, number> = new Map();

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

  stopAnimation(elementId: string): void {
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