import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileTableComponent } from './file-table.component';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { of } from 'rxjs';

class MockMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: any): string {
    return `Missing translation for: ${params.key}`;
  }
}

describe('FileTableComponent', () => {
  let component: FileTableComponent;
  let fixture: ComponentFixture<FileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FileTableComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: () => of({}),
            },
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MockMissingTranslationHandler,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
