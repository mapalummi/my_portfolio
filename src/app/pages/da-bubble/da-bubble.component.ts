import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-da-bubble',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './da-bubble.component.html',
  styleUrl: './da-bubble.component.scss',
})
export class DaBubbleComponent {
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
