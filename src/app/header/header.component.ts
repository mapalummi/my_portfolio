import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
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
