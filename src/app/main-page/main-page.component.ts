import { Component, HostListener } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { MyStackSectionComponent } from './my-stack-section/my-stack-section.component';
import { MyCraftSectionComponent } from './my-craft-section/my-craft-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';

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
    ChatbotComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  showBackToTop = false;

  // Toleranz in px statt exaktem Grenzwert, da scrollHeight/pageYOffset
  // auf Desktop durch Subpixel-Rundung nie exakt übereinstimmen müssen.
  private readonly bottomThreshold = 10;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const distanceToBottom =
      document.body.scrollHeight - (window.pageYOffset + window.innerHeight);
    this.showBackToTop = distanceToBottom <= this.bottomThreshold;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
