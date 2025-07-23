import {Component,forwardRef,Input} from '@angular/core';
import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-mat-datepicker-field',
  templateUrl: './mat-datepicker-field.component.html',
  styleUrls: ['./mat-datepicker-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatDatepickerFieldComponent),
      multi: true,
    },
  ],
})
export class MatDatepickerFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  value: Date | null = null;
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(event: any): void {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();
  }
}
