import { Component, OnInit } from '@angular/core';
//Neu
import { Router } from '@angular/router';

//NEU
import { ProjectNavigationService } from '../../services/project-navigation.service';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

//NEU
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MobileHeaderComponent } from '../../mobile-header/mobile-header.component';
import { MobileNavbarComponent } from '../../mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
    TranslatePipe,
    MobileHeaderComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent implements OnInit {
  constructor(
    private router: Router,
    private projectService: ProjectNavigationService
  ) {}

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnInit(): void {}

  goToNextProject(): void {
    this.projectService.navigateToNext(this.router.url);
  }

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
