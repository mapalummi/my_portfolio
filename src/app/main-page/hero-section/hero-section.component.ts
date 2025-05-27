import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
// export class HeroSectionComponent {

// }

export class HeroSectionComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.initializeBouncingLetters();
  }

  private initializeBouncingLetters(): void {
    const bouncingLetters = this.elementRef.nativeElement.querySelectorAll('.bouncing-letters > span');
    
    bouncingLetters.forEach((element: HTMLElement) => {
      element.addEventListener('mouseover', (e) => this.bounce(e.target as HTMLElement));
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
