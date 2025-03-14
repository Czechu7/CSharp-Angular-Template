import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuConfig } from '../../../config/menu.config';

export interface ILanguage {
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('pl');

  languages: ILanguage[] = MenuConfig.langs;

  initLanguage() {
    const browserLang = this.translateService.getBrowserLang();
    const defaultLang = 'pl';
    const lang = browserLang && this.isLanguageSupported(browserLang) ? browserLang : defaultLang;
    this.initializeLanguage(lang);
  }

  get currentLang$(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  constructor(private translateService: TranslateService) {
    const browserLang = translateService.getBrowserLang();
    const defaultLang = 'pl';

    const initialLang =
      browserLang && this.isLanguageSupported(browserLang) ? browserLang : defaultLang;

    const savedLang = localStorage.getItem('selectedLanguage');
    const langToUse = savedLang && this.isLanguageSupported(savedLang) ? savedLang : initialLang;

    this.initializeLanguage(langToUse);
  }

  initializeLanguage(lang: string): void {
    this.currentLangSubject.next(lang);

    this.translateService.setDefaultLang('pl');
    this.translateService.use(lang);

    localStorage.setItem('selectedLanguage', lang);
  }

  changeLanguage(lang: string): void {
    if (this.isLanguageSupported(lang)) {
      this.initializeLanguage(lang);
    }
  }

  private isLanguageSupported(lang: string): boolean {
    return this.languages.some(language => language.value === lang);
  }
}
