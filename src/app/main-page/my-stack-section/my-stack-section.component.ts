import { Component, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * MyStackSectionComponent displays the "My Stack" section of the portfolio.
 * Provides interactive peel animation functionality using mouse or touch events.
 */
@Component({
  selector: 'app-my-stack-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './my-stack-section.component.html',
  styleUrl: './my-stack-section.component.scss',
})
export class MyStackSectionComponent implements OnDestroy {
  /** Indicates whether the peel animation is completed. */
  isPeeled = false;
  /** Indicates whether the user is currently dragging. */
  isDragging = false;
  /** Stores the Y position where the drag started. */
  dragStartY = 0;
  /** Stores the current drag progress as a percentage. */
  dragProgress = 0;
  /** Number of pixels required to complete the peel animation. */
  dragThreshold = 100;

  private mouseMoveBound: (e: MouseEvent) => void;
  private mouseUpBound: () => void;

  /**
   * Creates an instance of MyStackSectionComponent.
   * Binds mouse event handlers to the component context.
   */
  constructor() {
    this.mouseMoveBound = this.onDrag.bind(this);
    this.mouseUpBound = this.onDragEnd.bind(this);
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Cleans up global event listeners.
   */
  ngOnDestroy() {
    this.removeGlobalEvents();
  }

  /**
   * Adds or removes a global CSS class for the grabbing cursor on the body element.
   * @param enable Whether to add or remove the class.
   */
  setGlobalGrabbingCursor(enable: boolean) {
    if (enable) {
      document.body.classList.add('global-grabbing');
    } else {
      document.body.classList.remove('global-grabbing');
    }
  }

  /**
   * Handles the start of a drag event for the peel animation.
   * @param event MouseEvent or TouchEvent that starts the drag.
   */
  onDragStart(event: MouseEvent | TouchEvent) {
    // Peel instantly on small screens
    if (window.innerWidth <= 700) {
      this.isPeeled = true;
      return;
    }

    this.isDragging = true;

    if (event instanceof MouseEvent) {
      this.dragStartY = event.clientY;
    } else if (event instanceof TouchEvent) {
      this.dragStartY = event.touches[0].clientY;
    }

    this.setGlobalGrabbingCursor(true);

    window.addEventListener('mousemove', this.mouseMoveBound);
    window.addEventListener('mouseup', this.mouseUpBound);

    event.preventDefault();
  }

  /**
   * Handles the end of a drag event for the peel animation.
   * Resets drag state and cleans up event listeners.
   */
  onDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.setGlobalGrabbingCursor(false);
    this.removeGlobalEvents();

    if (this.dragProgress < 100 && !this.isPeeled) {
      this.dragProgress = 0;
    }
  }

  /**
   * Handles mouse movement during a drag event.
   * Updates drag progress and completes peel if threshold is reached.
   * @param event MouseEvent triggered during dragging.
   */
  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    const dragDistance = Math.max(0, event.clientY - this.dragStartY);

    this.dragProgress = Math.min(
      100,
      (dragDistance / this.dragThreshold) * 100
    );

    if (this.dragProgress >= 100 && !this.isPeeled) {
      this.completePeel();
    }
  }

  /**
   * Completes the peel animation by setting isPeeled to true.
   */
  completePeel() {
    this.isPeeled = true;
  }

  /**
   * Removes global mouse event listeners for dragging.
   */
  removeGlobalEvents() {
    window.removeEventListener('mousemove', this.mouseMoveBound);
    window.removeEventListener('mouseup', this.mouseUpBound);
  }

  /**
   * Toggles the peeled state if not currently dragging.
   * Used as a fallback method for triggering the peel animation.
   */
  togglePeel() {
    if (!this.isDragging) {
      this.isPeeled = !this.isPeeled;
    }
  }
}
