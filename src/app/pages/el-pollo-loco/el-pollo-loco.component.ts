import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectNavigationService } from '../../services/project-navigation.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-el-pollo-loco',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule, TranslatePipe],
  templateUrl: './el-pollo-loco.component.html',
  styleUrl: './el-pollo-loco.component.scss',
})
export class ElPolloLocoComponent implements OnInit {
  constructor(private router: Router, private projectService: ProjectNavigationService) {}

   //NEU
  isMobileMenuOpen = false;
  //NEU
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

   ngOnInit(): void {
  }

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
