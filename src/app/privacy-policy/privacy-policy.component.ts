import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) { }

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
