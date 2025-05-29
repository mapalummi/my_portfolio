import { Component } from '@angular/core';
import { AboutMeSectionComponent } from '../../about-me-section/about-me-section.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AboutMeSectionComponent], //CHECK: Warum hab ich die hier rein gestezt??
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isEnglish = false; // Toggle-Status

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
  }

  setGerman(){
    this.isEnglish = false;
  }

  setEnglish(){
    this.isEnglish = true;
  }
}
