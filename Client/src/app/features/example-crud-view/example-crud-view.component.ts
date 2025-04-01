import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { RouterEnum } from '../../enums/router.enum';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ExampleCrudForm } from '../../shared/models/form.model';
import { ErrorService } from '../../shared/services/error.service';
import { FormService } from '../../shared/services/form.service';
import { IKarmelki, IKarmelkiResponse } from '../../core/_models/karmelki.model';
import { ExampleCrudService } from '../../core/_services/example-crud.service';
import { IBaseResponse } from '../../core/_models/base-response.model';
import { ReusableModalComponent } from '../../shared/components/reusable-modal/reusable-modal.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-example-crud-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    CalendarModule,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    ConfirmModalComponent,
    ReusableModalComponent,
    TranslateModule,
  ],
  templateUrl: './example-crud-view.component.html',
  styleUrl: './example-crud-view.component.scss',
})
export class ExampleCrudViewComponent implements OnInit {
  exampleForm!: FormGroup<ExampleCrudForm>;
  RouterEnum = RouterEnum;
  karmelki: IKarmelki[] = [];
  totalRecords = 0;
  loading = false;
  dialogVisible = false;
  confirmDialogVisible = false;
  editMode = false;
  selectedKarmelek: IKarmelki | null = null;

  private formService = inject(FormService);
  private errorService = inject(ErrorService);
  private exampleCrudService = inject(ExampleCrudService);

  ngOnInit() {
    this.exampleForm = this.formService.getExampleCrudForm();
    this.loadKarmelki();
  }

  get controls() {
    return this.exampleForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  loadKarmelki(event?: { first: number; rows: number }) {
    this.loading = true;
    const pageNumber = event ? event.first / event.rows + 1 : 1;
    const pageSize = event ? event.rows : 10;

    this.exampleCrudService.getPagedKarmelki({ pageNumber, pageSize }).subscribe({
      next: (response: IBaseResponse<IKarmelkiResponse>) => {
        this.karmelki = response.data.items;
        this.totalRecords = response.data.totalCount;
        this.loading = false;
      },
      error: error => {
        console.error('Błąd podczas pobierania karmelków', error);
        this.loading = false;
      },
    });
  }

  showDialog() {
    this.editMode = false;
    this.exampleForm.reset();
    this.controls.isZiemniak.setValue(false);
    this.controls.arrivalDate.setValue(new Date());
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }

  editKarmelek(karmelek: IKarmelki) {
    this.editMode = true;
    this.selectedKarmelek = karmelek;
    this.exampleForm.patchValue({
      id: karmelek.id || '',
      name: karmelek.name,
      count: karmelek.count,
      price: karmelek.price,
      isZiemniak: karmelek.isZiemniak,
      arrivalDate: new Date(karmelek.arrivalDate),
    });
    this.dialogVisible = true;
  }

  saveKarmelek() {
    if (this.exampleForm.invalid) {
      return;
    }

    const karmelek: IKarmelki = {
      name: this.controls.name.value,
      count: this.controls.count.value,
      price: this.controls.price.value,
      isZiemniak: this.controls.isZiemniak.value,
      arrivalDate: this.controls.arrivalDate.value,
    };

    if (this.editMode && this.selectedKarmelek?.id) {
      karmelek.id = this.selectedKarmelek.id;
      this.exampleCrudService.updateKarmelek(this.selectedKarmelek.id, karmelek).subscribe({
        next: () => {
          this.loadKarmelki();
          this.hideDialog();
        },
        error: error => console.error('Błąd podczas aktualizacji karmelka', error),
      });
    } else {
      this.exampleCrudService.createKarmelek(karmelek).subscribe({
        next: () => {
          this.loadKarmelki();
          this.hideDialog();
        },
        error: error => console.error('Błąd podczas tworzenia karmelka', error),
      });
    }
  }

  confirmDelete(karmelek: IKarmelki) {
    this.selectedKarmelek = karmelek;
    this.confirmDialogVisible = true;
  }

  deleteKarmelek() {
    if (this.selectedKarmelek?.id) {
      this.exampleCrudService.deleteKarmelek(this.selectedKarmelek.id).subscribe({
        next: () => {
          this.confirmDialogVisible = false;
          this.loadKarmelki();
        },
        error: error => console.error('Błąd podczas usuwania karmelka', error),
      });
    }
  }
}
