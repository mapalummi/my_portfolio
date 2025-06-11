import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private isEnglishSubject = new BehaviorSubject<boolean>(true);
  public isEnglish$ = this.isEnglishSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY) || 'en';
    const isEnglish = savedLanguage === 'en';

    this.translate.use(savedLanguage);
    this.isEnglishSubject.next(isEnglish);
  }

  setEnglish(): void {
    this.translate.use('en');
    localStorage.setItem(this.STORAGE_KEY, 'en');
    this.isEnglishSubject.next(true);
  }

  setGerman(): void {
    this.translate.use('de');
    localStorage.setItem(this.STORAGE_KEY, 'de');
    this.isEnglishSubject.next(false);
  }

  getCurrentLanguage(): string {
    return localStorage.getItem(this.STORAGE_KEY) || 'en';
  }

  isCurrentlyEnglish(): boolean {
    return this.isEnglishSubject.value;
  }
}
