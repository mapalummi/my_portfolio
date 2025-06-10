import { Component } from '@angular/core';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isEnglish = false; // Toggle-Status

  // toggleLanguage() {
  //   this.isEnglish = !this.isEnglish;
  // }

  // setGerman(){
  //   this.isEnglish = false;
  // }

  // setEnglish(){
  //   this.isEnglish = true;
  // }

  constructor(private translate: TranslateService) {}

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
  }

  setGerman(language: string) {
    this.isEnglish = false;
    this.translate.use(language);
  }
  setEnglish(language: string) {
    this.isEnglish = true;
    this.translate.use(language);
  }
}
