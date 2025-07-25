import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ViewportScroller } from '@angular/common';

/**
 * AboutMeSectionComponent displays the "About Me" section of the portfolio.
 * Provides functionality to scroll to specific sections within the page.
 */
@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss',
})
export class AboutMeSectionComponent {
  /**
   * Creates an instance of AboutMeSectionComponent.
   * @param viewportScroller Service for scrolling to anchors.
   */
  constructor(private viewportScroller: ViewportScroller) {}

  /**
   * Scrolls smoothly to the section with the given element ID.
   * @param elementId The ID of the target section.
   */
  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
