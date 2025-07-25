import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { CommonModule } from '@angular/common';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';

/**
 * ImprintComponent displays the imprint (legal notice) page.
 * Includes header, footer, mobile navigation, and provides navigation back to the main page.
 */
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent {
  /**
   * Creates an instance of ImprintComponent.
   * @param router Angular Router for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Indicates whether the mobile menu is open.
   */
  isMobileMenuOpen = false;

  /**
   * Toggles the mobile menu open or closed.
   */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Navigates back to the main page and scrolls to the contact section.
   * Temporarily disables smooth scroll for instant navigation.
   */
  goBack(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        const originalBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        const element = document.getElementById('contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }

        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = originalBehavior;
        });
      });
    });
  }
}
