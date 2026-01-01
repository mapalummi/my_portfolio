import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { SocialbarComponent } from '../main-page/hero-section/socialbar/socialbar.component';

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
  /**
   * Initializes the component and subscribes to the language status.
   * Called when the component is created.
   */
  ngOnInit(): void {
    this.languageSubscription = this.languageService.isEnglish$.subscribe(
      (isEnglish) => (this.isEnglish = isEnglish)
    );
  }

  // NOTE: NEU zum TESTEN:
  hoveredLinks = new Set<string>();

  markAsHovered(linkName: string) {
    this.hoveredLinks.add(linkName);
  }

  /**
   * Emits an event to close the menu.
   */
  @Output() closeMenu = new EventEmitter<void>();

  /**
   * Cleans up resources by unsubscribing from the language observable.
   * Called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  /**
   * Sets the language to English.
   */
  setEnglish(): void {
    this.languageService.setEnglish();
  }

  /**
   * Sets the language to German.
   */
  setGerman(): void {
    this.languageService.setGerman();
  }
}
