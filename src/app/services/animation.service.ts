import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animations: Map<string, { active: boolean, position: number }> = new Map();
  private animationFrames: Map<string, number> = new Map();

  startAnimation(elementId: string, maxXLeft: number, xRight: number): void {
    this.stopAnimation(elementId);
    
    this.animations.set(elementId, { active: true, position: 0 });
    
    const animate = (): void => {
      if (!this.animations.get(elementId)?.active) return;
      
      const current = this.animations.get(elementId);
      if (!current) return;
      
      if (current.position > maxXLeft) {
        current.position -= 5;
        this.animations.set(elementId, current);
        
        const frameId = requestAnimationFrame(animate);
        this.animationFrames.set(elementId, frameId);
      } else {
        current.position = xRight;
        this.animations.set(elementId, current);
        
        const frameId = requestAnimationFrame(animate);
        this.animationFrames.set(elementId, frameId);
      }
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
    
    this.animations.set(elementId, { active: false, position: 0 });
  }

  getAnimationPosition(elementId: string): number {
    return this.animations.get(elementId)?.position || 0;
  }
}