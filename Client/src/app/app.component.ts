import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MenuConfig } from './config/menu.config';
import { LanguageService } from './core/_services/language/language.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/_services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = MenuConfig.title;
  langs = MenuConfig.langs;
  authMenuItems = MenuConfig.authMenuItems;
  nonAuthMenuItems = MenuConfig.nonAuthMenuItems;
  footerTitle = MenuConfig.footerTitle;

  protected authService = inject(AuthService);

  private languageService = inject(LanguageService);

  ngOnInit() {
    this.languageService.initLanguage();
  }
}
