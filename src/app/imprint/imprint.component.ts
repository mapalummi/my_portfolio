import { Component, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';

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
export class ImprintComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  isMobileMenuOpen = false;

  ngAfterViewInit(): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(
      script,
      'src',
      'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js'
    );
    this.renderer.appendChild(this.document.body, script);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        const originalBehavior = this.document.documentElement.style.scrollBehavior;
        this.document.documentElement.style.scrollBehavior = 'auto';

        const element = this.document.getElementById('contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }

        requestAnimationFrame(() => {
          this.document.documentElement.style.scrollBehavior = originalBehavior;
        });
      });
    });
  }
}
