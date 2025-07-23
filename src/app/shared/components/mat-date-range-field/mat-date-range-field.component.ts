import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-mat-date-range-field',
  templateUrl: './mat-date-range-field.component.html',
  styleUrls: ['./mat-date-range-field.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class MatDateRangeFieldComponent {
  @Input() startControlName!: string;
  @Input() endControlName!: string;
  @Input() label: string = 'Date Range';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
}
