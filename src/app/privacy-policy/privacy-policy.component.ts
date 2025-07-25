import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';

/**
 * PrivacyPolicyComponent displays the privacy policy page.
 * Includes header, footer, mobile navigation, and provides navigation back to the main page.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  /**
   * Indicates whether the mobile menu is open.
   */
  isMobileMenuOpen = false;

  /**
   * Creates an instance of PrivacyPolicyComponent.
   * @param router Angular Router for navigation.
   */
  constructor(private router: Router) { }

  /**
   * Toggles the mobile menu open or closed.
   */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Angular lifecycle hook called when the component is initialized.
   * Scrolls to the top of the page.
   */
  ngOnInit() {
    window.scrollTo(0, 0);
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
