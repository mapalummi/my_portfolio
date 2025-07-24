import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SocialbarComponent } from '../main-page/hero-section/socialbar/socialbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SocialbarComponent],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '300ms ease',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class MobileNavbarComponent implements OnInit, OnDestroy {
  isEnglish: boolean = true;
  isOpen: boolean = true;
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

  onCloseMenu(): void {
    this.isOpen = false;
  }

  onAnimationDone(event: any): void {
    if (event.toState === 'void') {
      this.closeMenu.emit()
    }
  }
}
