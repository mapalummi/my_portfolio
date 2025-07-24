import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { SocialbarComponent } from '../main-page/hero-section/socialbar/socialbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-navbar',
  standalone: true,
  imports: [TranslatePipe, SocialbarComponent],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss',
})
export class MobileNavbarComponent implements OnInit, OnDestroy {
  isEnglish: boolean = true;
  private languageSubscription: Subscription = new Subscription();

  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageSubscription = this.languageService.isEnglish$.subscribe(
      (isEnglish) => (this.isEnglish = isEnglish)
    );
  }

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
