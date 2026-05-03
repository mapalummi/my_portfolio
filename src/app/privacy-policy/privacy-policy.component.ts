import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  isMobileMenuOpen = false;
  showBackToTop = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const atBottom =
      window.pageYOffset + window.innerHeight >= document.body.scrollHeight;
    this.showBackToTop = atBottom;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
