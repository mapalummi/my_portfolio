import { Component } from '@angular/core';
//Neu
import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

//NEU
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent {
  //NEU
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
