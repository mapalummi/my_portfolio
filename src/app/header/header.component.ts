import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { SocialbarComponent } from "../main-page/hero-section/socialbar/socialbar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, SocialbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isEnglish: boolean = true;
  private languageSubscription: Subscription = new Subscription();

  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageSubscription = this.languageService.isEnglish$.subscribe(
      (isEnglish) => (this.isEnglish = isEnglish)
    );
  }

  // NEU !!!
  @Output() closeMenu = new EventEmitter<void>();

 


  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  setEnglish(): void {
    this.languageService.setEnglish();
  }

  setGerman(): void {
    this.languageService.setGerman();
  }
}
