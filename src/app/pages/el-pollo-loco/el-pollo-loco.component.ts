import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-el-pollo-loco',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './el-pollo-loco.component.html',
  styleUrl: './el-pollo-loco.component.scss',
})
export class ElPolloLocoComponent {
  constructor(private router: Router) {}

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
