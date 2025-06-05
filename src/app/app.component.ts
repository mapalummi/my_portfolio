import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my_portfolio';

  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
