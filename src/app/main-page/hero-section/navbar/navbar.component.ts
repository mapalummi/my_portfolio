import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
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
