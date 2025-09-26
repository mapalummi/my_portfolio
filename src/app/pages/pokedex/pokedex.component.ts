import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectNavigationService } from '../../services/project-navigation.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MobileHeaderComponent } from '../../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../../mobile-navbar/mobile-navbar.component';

/**
 * PokedexComponent displays the Pokedex project page.
 * Includes header, mobile navigation, and provides navigation between projects and back to the main page.
 */
@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent implements OnInit {
  /**
   * Creates an instance of PokedexComponent.
   * @param router Angular Router for navigation.
   * @param projectService Service for navigating between projects.
   */
  constructor(
    private router: Router,
    private projectService: ProjectNavigationService
  ) {}

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
   * Angular lifecycle hook called when the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Navigates to the next project using the ProjectNavigationService.
   */
  goToNextProject(): void {
    this.projectService.navigateToNext(this.router.url);
  }

  /**
   * Navigates back to the main page and scrolls to the "my-craft-section".
   * Temporarily disables smooth scroll for instant navigation.
   */
  goBack(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        const originalBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        const element = document.getElementById('my-craft-section');
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
