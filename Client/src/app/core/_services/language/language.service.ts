import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuConfig } from '../../../config/menu.config';
import { LanguageCode } from '../../../enums/LanguageCode.enum';
import { ILanguage } from '../../_models/language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>(LanguageCode.POLISH);
  private DEFAULT_LANG = LanguageCode.POLISH;
  private translateService = inject(TranslateService);

  languages: ILanguage[] = MenuConfig.langs;

  constructor() {
    const langToUse = this.determineInitialLanguage();
    this.initializeLanguage(langToUse);
  }

  get currentLang$(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  initLanguage(): void {
    const langToUse = this.determineInitialLanguage();
    this.initializeLanguage(langToUse);
  }

  changeLanguage(lang: string): void {
    if (this.isLanguageSupported(lang)) {
      this.initializeLanguage(lang);
    }
  }

  private initializeLanguage(lang: string): void {
    this.currentLangSubject.next(lang);
    this.translateService.setDefaultLang(this.DEFAULT_LANG);
    this.translateService.use(lang);
    localStorage.setItem('selectedLanguage', lang);
  }

  private isLanguageSupported(lang: string): boolean {
    return this.languages.some(language => language.value === lang);
  }

  private determineInitialLanguage(): string {
    const browserLang = this.translateService.getBrowserLang();
    const savedLang = localStorage.getItem('selectedLanguage');

    if (savedLang && this.isLanguageSupported(savedLang)) {
      return savedLang;
    }

    if (browserLang && this.isLanguageSupported(browserLang)) {
      return browserLang;
    }

    return this.DEFAULT_LANG;
  }
}
