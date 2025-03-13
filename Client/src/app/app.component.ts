import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MenuConfig } from './config/menu.config';
import { AuthService } from './core/_services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected authService = inject(AuthService);

  title = MenuConfig.title;
  langs = MenuConfig.langs;
  authMenuItems = MenuConfig.authMenuItems;
  nonAuthMenuItems = MenuConfig.nonAuthMenuItems;
  footerTitle = MenuConfig.footerTitle;
}
