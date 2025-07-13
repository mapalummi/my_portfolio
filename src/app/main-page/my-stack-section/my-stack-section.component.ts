import { Component, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-stack-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './my-stack-section.component.html',
  styleUrl: './my-stack-section.component.scss',
})
export class MyStackSectionComponent implements OnDestroy {
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

  // Body Element bekommt CSS-Klasse zugewiesen
  setGlobalGrabbingCursor(enable: boolean) {
    if (enable) {
      document.body.classList.add('global-grabbing');
    } else {
      document.body.classList.remove('global-grabbing');
    }
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    // if (this.isPeeled) return;

    if (window.innerWidth <= 700) {
      this.isPeeled = true;
      return;
    }

    this.isDragging = true;
    // this.dragStartY = event.clientY;

    if (event instanceof MouseEvent) {
      this.dragStartY = event.clientY;
    } else if (event instanceof TouchEvent) {
      this.dragStartY = event.touches[0].clientY;
    }

    this.setGlobalGrabbingCursor(true); // Cursor global setzen

    window.addEventListener('mousemove', this.mouseMoveBound);
    window.addEventListener('mouseup', this.mouseUpBound);

    event.preventDefault();
  }

  onDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.setGlobalGrabbingCursor(false); // Cursor global entfernen
    this.removeGlobalEvents();

    if (this.dragProgress < 100 && !this.isPeeled) {
      this.dragProgress = 0;
    }
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    // Calculate drag distance (positive = drag down)
    const dragDistance = Math.max(0, event.clientY - this.dragStartY);

    // Calculate progress percentage
    this.dragProgress = Math.min(
      100,
      (dragDistance / this.dragThreshold) * 100
    );

    // Complete peel if threshold reached
    if (this.dragProgress >= 100 && !this.isPeeled) {
      this.completePeel();
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
