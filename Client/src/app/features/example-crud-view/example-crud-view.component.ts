import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterEnum } from '../../enums/router.enum';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ExampleCrudForm } from '../../shared/models/form.model';
import { ErrorService } from '../../shared/services/error.service';
import { FormService } from '../../shared/services/form.service';
import { ExampleCrudService } from '../../core/_services/example-crud.service';

@Component({
  selector: 'app-example-crud-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './example-crud-view.component.html',
  styleUrl: './example-crud-view.component.scss',
})
export class ExampleCrudViewComponent implements OnInit {
  exampleForm!: FormGroup<ExampleCrudForm>;
  RouterEnum = RouterEnum;

  private formService = inject(FormService);
  private errorService = inject(ErrorService);
  private exampleService = inject(ExampleCrudService);

  ngOnInit() {
    this.exampleForm = this.formService.getExampleCrudForm();
  }

  get controls() {
    return this.exampleForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  showDialog() {
    throw new Error('Method not implemented.');
  }
}
