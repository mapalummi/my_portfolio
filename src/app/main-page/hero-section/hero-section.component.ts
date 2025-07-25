import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { SocialbarComponent } from './socialbar/socialbar.component';
import { HeaderComponent } from '../../header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MobileHeaderComponent } from '../../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../../mobile-navbar/mobile-navbar.component';

/**
 * HeroSectionComponent displays the main hero section of the portfolio.
 * It includes header, social bar, mobile navigation, and interactive bouncing letters.
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SocialbarComponent,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements AfterViewInit {
  /**
   * Indicates whether the mobile menu is open.
   */
  isMobileMenuOpen = false;

  /**
   * Creates an instance of HeroSectionComponent.
   * @param elementRef Reference to the component's DOM element.
   * @param viewportScroller Service for scrolling to anchors.
   */
  constructor(
    private elementRef: ElementRef,
    private viewportScroller: ViewportScroller
  ) {}

  /**
   * Toggles the mobile menu open or closed.
   */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Lifecycle hook called after the component's view has been initialized.
   * Initializes the bouncing letters animation.
   */
  ngAfterViewInit(): void {
    this.initializeBouncingLetters();
  }

  /**
   * Scrolls smoothly to the section with the given element ID.
   * @param elementId The ID of the target section.
   */
  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  /**
   * Initializes event listeners for bouncing letter animation.
   * Adds mouseover listeners to each letter span.
   * @private
   */
  private initializeBouncingLetters(): void {
    const bouncingLetters = this.elementRef.nativeElement.querySelectorAll(
      '.bouncing-letters > span'
    );

    bouncingLetters.forEach((element: HTMLElement) => {
      element.addEventListener('mouseover', (e) =>
        this.bounce(e.target as HTMLElement)
      );
    });
  }

  /**
   * Triggers the bounce animation on a letter element.
   * Adds the 'bounce' class and removes it after the animation duration.
   * @param letter The letter element to animate.
   * @private
   */
  private bounce(letter: HTMLElement): void {
    if (!letter.classList.contains('bounce')) {
      letter.classList.add('bounce');
      setTimeout(() => {
        letter.classList.remove('bounce');
      }, 1000);
    }
  }
}
