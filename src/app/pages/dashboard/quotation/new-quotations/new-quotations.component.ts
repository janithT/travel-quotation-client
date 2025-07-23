import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { QuotationService } from 'src/app/services/quotation.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-quotations',
  templateUrl: './new-quotations.component.html',
  styleUrls: ['./new-quotations.component.css'],
})
export class NewQuotationsComponent {
  quotationForm: FormGroup;
  loading: boolean = false;
  creating = false;
  errorMessage = '';

  minDate: Date | null = null;
  maxDate: Date | null = null;

  dobminDate: Date | null = null;
  dobmaxDate: Date | null = null;

  currency_id: string = 'EUR';

  total: string = '';
  currency: string = '';

  constructor(
    private fb: FormBuilder,
    private quotationService: QuotationService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date(2050, 11, 31);

    const today = new Date();
    this.dobminDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    this.dobmaxDate = today;

    this.quotationForm = this.fb.group(
      {
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        currency_id: [this.currency_id, Validators.required],
        travellers: this.fb.array([this.createTravellerGroup()]),
      },
      {
        validators: this.dateRangeValidator,
      }
    );
  }

  // Get controller names
  getControl(controlName: string): FormControl {
    return this.quotationForm.get(controlName) as FormControl;
  }
  get travellers(): FormArray {
    return this.quotationForm.get('travellers') as FormArray;
  }

  // Create a new traveller group
  createTravellerGroup(): FormGroup {
    return this.fb.group({
      age: [null, [Validators.required, this.dateValidator]],
    });
  }

  // Add validation for dob
  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const dob = control.value;
    // if (!dob) return { invalidDate: true };

    const date = new Date(dob);
    if (!dob || isNaN(date.getTime())) {
      return { invalidDate: true };
    }

    return null;
  }

  // VAlidation for date range
  private dateRangeValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const start = control.get('start_date')?.value;
    const end = control.get('end_date')?.value;

    if (start && end && new Date(start) > new Date(end)) {
      return { dateRangeInvalid: true };
    }

    if (start && !(start instanceof Date)) {
      return { invaliStartdDate: true };
    }

    if (end && !(end instanceof Date)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  // Format date
  private formatToYMD(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  // Calculate age from date of birth and trip start_date
  private calculateAge(dob: Date, referenceDate: Date): number {
    const birth = new Date(dob);
    const ref = new Date(referenceDate);

    let age = ref.getFullYear() - birth.getFullYear();
    const m = ref.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  // Format and clean the payload
  private buildFormattedPayload(rawFormData: any, startDate: Date): any {
    return {
      start_date: this.formatToYMD(rawFormData.start_date),
      end_date: this.formatToYMD(rawFormData.end_date),
      currency_id: this.currency_id,
      age: rawFormData.travellers
        .map((years: any) => this.calculateAge(years.age, startDate)) // in here im calculating age based on travel days make a list
        .join(','),
    };
  }

  // Create quotation
  submitQuot(): void {
    this.loading = true;
    this.creating = true;

    const rawFormData = this.quotationForm.value;
    const startDate = new Date(rawFormData.start_date);

    const formattedPayload = this.buildFormattedPayload(this.quotationForm.value, startDate);

    this.quotationService.createQuotation(formattedPayload).subscribe({
      next: (response: any) => {
        this.quotationForm.reset();
        this.loading = false;
        this.creating = false;
        if (response.status == 'success') {
          this.total = response.data.total;
          this.currency = response.data.currency_id;
          this.notificationService.show(response?.message, 'success');
        } else {
          this.notificationService.show('Quotation created failed.', 'error');
        }
      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          this.handleApiValidationErrors(err?.error?.errors);
          this.loading = false;
          this.creating = false;
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Create quotation failed';
          this.loading = false;
          this.creating = false;
          this.notificationService.show(
            err?.error?.message || 'Create quotation failed.',
            'error'
          );
        }
      },
    });
  }

  // Laravel validation errors
  handleApiValidationErrors(errors: { [key: string]: string[] }) {
    Object.keys(errors).forEach((field) => {

      const match = field.match(/^age\.(\d+)$/);
      if (match) {
        const index = +match[1];
        const travellersArray = this.quotationForm.get('travellers');
        const travellerControl = travellersArray?.get([index.toString()]);
        if (travellerControl) {
          const ageControl = travellerControl.get('age');
          if (ageControl) {
            ageControl.setErrors({ server: errors[field].join(', ') });
            ageControl.markAsTouched();
          }
        }
      } else {
        const control = this.quotationForm.get(field);
        if (control) {
          control.setErrors({
            server: errors[field].join(', '),
          });
          control.markAsTouched();
        }
      }
    });
  }

  // Handle currency change
  onStatusChanged(status: string): void {
    this.currency_id = status;
  }

  // Add a new traveller
  addTraveller() {
    this.travellers.push(this.createTravellerGroup());
  }

  // Remove a traveller
  removeTraveller(index: number) {
    if (this.travellers.length > 1) {
      this.travellers.removeAt(index);
    }
  }
}
