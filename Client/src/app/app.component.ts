import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MenuConfig } from './config/menu.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = MenuConfig.title;
  langs = MenuConfig.langs;
  authMenuItems = MenuConfig.authMenuItems;
  nonAuthMenuItems = MenuConfig.nonAuthMenuItems;
  footerTitle = MenuConfig.footerTitle;
}
