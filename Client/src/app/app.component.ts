import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MenuConfig } from './config/menu.config';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './core/_services/language/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = MenuConfig.title;
  langs = MenuConfig.langs;
  authMenuItems = MenuConfig.authMenuItems;
  nonAuthMenuItems = MenuConfig.nonAuthMenuItems;
  footerTitle = MenuConfig.footerTitle;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.initLanguage();
  }
}
