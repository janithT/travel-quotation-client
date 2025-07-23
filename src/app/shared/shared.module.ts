import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { ButtonComponent } from './components/button/button.component';
// import { FormInputFieldComponent } from './components/form-input-field/form-input-field.component';

//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatInputFieldComponent } from './components/mat-input-field/mat-input-field.component';
import { MatButtonComponent } from './components/mat-button/mat-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerFieldComponent } from './components/mat-datepicker-field/mat-datepicker-field.component';
import { MatNativeDateModule } from '@angular/material/core';

import { StatusFilterComponent } from './components/status-filter/status-filter.component';
import { MatDateRangeFieldComponent } from './components/mat-date-range-field/mat-date-range-field.component';

@NgModule({
  declarations: [
    MatInputFieldComponent,
    MatButtonComponent,
    MatDatepickerFieldComponent,
    StatusFilterComponent,
    MatDateRangeFieldComponent,
    MatDateRangeFieldComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  exports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatInputFieldComponent,
    MatButtonComponent,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDatepickerFieldComponent,
    MatDateRangeFieldComponent,

    StatusFilterComponent,
    
  ],

})
export class SharedModule { }
