import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LanguageService manages the application's language state.
 * Provides methods to switch languages, persist selection, and observe language changes.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /** Key used for storing the selected language in localStorage. */
  private readonly STORAGE_KEY = 'selectedLanguage';
  /** Subject tracking whether English is currently selected. */
  private isEnglishSubject = new BehaviorSubject<boolean>(true);
  /** Observable for components to react to language changes. */
  public isEnglish$ = this.isEnglishSubject.asObservable();

  /**
   * Creates an instance of LanguageService.
   * Initializes the language based on localStorage or defaults to English.
   * @param translate Service for handling translations.
   */
  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Initializes the language from localStorage or defaults to English.
   * Sets the translation service and updates the subject.
   * @private
   */
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY) || 'en';
    const isEnglish = savedLanguage === 'en';

    this.translate.use(savedLanguage);
    this.isEnglishSubject.next(isEnglish);
  }

  /**
   * Sets the application language to English and persists the selection.
   */
  setEnglish(): void {
    this.translate.use('en');
    localStorage.setItem(this.STORAGE_KEY, 'en');
    this.isEnglishSubject.next(true);
  }

  /**
   * Sets the application language to German and persists the selection.
   */
  setGerman(): void {
    this.translate.use('de');
    localStorage.setItem(this.STORAGE_KEY, 'de');
    this.isEnglishSubject.next(false);
  }

  /**
   * Gets the currently selected language from localStorage.
   * @returns The language code ('en' or 'de').
   */
  getCurrentLanguage(): string {
    return localStorage.getItem(this.STORAGE_KEY) || 'en';
  }

  /**
   * Returns whether the current language is English.
   * @returns True if English is selected, false otherwise.
   */
  isCurrentlyEnglish(): boolean {
    return this.isEnglishSubject.value;
  }
}
