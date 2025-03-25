import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuConfig } from './config/menu.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: () => of({}),
            },
          },
        }),
      ],
      providers: [MessageService, TranslateService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set values from MenuConfig', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual(MenuConfig.title);
    expect(app.langs).toEqual(MenuConfig.langs);
    expect(app.authMenuItems).toEqual(MenuConfig.authMenuItems);
    expect(app.nonAuthMenuItems).toEqual(MenuConfig.nonAuthMenuItems);
    expect(app.footerTitle).toEqual(MenuConfig.footerTitle);
  });

  it('should render NavbarComponent and FooterComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should contain <router-outlet>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
