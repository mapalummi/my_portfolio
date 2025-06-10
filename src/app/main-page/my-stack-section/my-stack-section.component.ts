import { Component, OnDestroy } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-stack-section',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './my-stack-section.component.html',
  styleUrl: './my-stack-section.component.scss'
})
export class MyStackSectionComponent implements OnDestroy {
// isPeeled = false;

// togglePeel(){
//   this.isPeeled = !this.isPeeled;
// }

isPeeled = false;
  isDragging = false;
  dragStartY = 0;
  dragProgress = 0;
  dragThreshold = 100; // Pixels needed to drag to complete peel
  
  private mouseMoveBound: (e: MouseEvent) => void;
  private mouseUpBound: () => void;
  
  constructor() {
    this.mouseMoveBound = this.onDrag.bind(this);
    this.mouseUpBound = this.onDragEnd.bind(this);
  }
  
  ngOnDestroy() {
    // Clean up event listeners
    this.removeGlobalEvents();
  }

  onDragStart(event: MouseEvent) {
    if (this.isPeeled) return;
    
    this.isDragging = true;
    this.dragStartY = event.clientY;
    
    // Add global event listeners
    window.addEventListener('mousemove', this.mouseMoveBound);
    window.addEventListener('mouseup', this.mouseUpBound);
    
    // Prevent text selection
    event.preventDefault();
  }
  
  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    
    // Calculate drag distance (positive = drag down)
    const dragDistance = Math.max(0, event.clientY - this.dragStartY);
    
    // Calculate progress percentage
    this.dragProgress = Math.min(100, (dragDistance / this.dragThreshold) * 100);
    
    // Complete peel if threshold reached
    if (this.dragProgress >= 100 && !this.isPeeled) {
      this.completePeel();
    }
  }

  onDragEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.removeGlobalEvents();
    
    // Reset if not completely peeled
    if (this.dragProgress < 100 && !this.isPeeled) {
      this.dragProgress = 0;
    }
  }
  
  completePeel() {
    this.isPeeled = true;
  }
  
  removeGlobalEvents() {
    window.removeEventListener('mousemove', this.mouseMoveBound);
    window.removeEventListener('mouseup', this.mouseUpBound);
  }
  
  // Keep original method as fallback
  togglePeel() {
    if (!this.isDragging) {
      this.isPeeled = !this.isPeeled;
    }
  }
}
