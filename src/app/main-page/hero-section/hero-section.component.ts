import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { SocialbarComponent } from './socialbar/socialbar.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [HeaderComponent, SocialbarComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})


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
