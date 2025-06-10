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
  isEnglish = true; // Toggle-Status

  constructor(private translate: TranslateService) {
    this.translate.use('en');
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
