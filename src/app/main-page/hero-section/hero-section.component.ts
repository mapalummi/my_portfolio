import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { SocialbarComponent } from './socialbar/socialbar.component';
import { HeaderComponent } from '../../header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MobileHeaderComponent } from '../../mobile-header/mobile-header.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SocialbarComponent, TranslatePipe, MobileHeaderComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private viewportScroller: ViewportScroller
  ) {}

  //NEU
  isMobileMenuOpen = false;
  //NEU
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngAfterViewInit(): void {
    this.initializeBouncingLetters();
  }

  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

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

  private bounce(letter: HTMLElement): void {
    if (!letter.classList.contains('bounce')) {
      letter.classList.add('bounce');
      setTimeout(() => {
        letter.classList.remove('bounce');
      }, 1000);
    }
  }
}
