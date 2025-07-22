import { Component, HostListener } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { MyStackSectionComponent } from './my-stack-section/my-stack-section.component';
import { MyCraftSectionComponent } from './my-craft-section/my-craft-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    RouterModule,
    HeroSectionComponent,
    AboutMeSectionComponent,
    MyStackSectionComponent,
    MyCraftSectionComponent,
    TestimonialsSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // this.showBackToTop = window.pageYOffset > 1000;
    const atBottom =
      window.pageYOffset + window.innerHeight >= document.body.scrollHeight;
    this.showBackToTop = atBottom;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
