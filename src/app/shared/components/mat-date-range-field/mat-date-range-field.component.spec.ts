import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDateRangeFieldComponent } from './mat-date-range-field.component';

describe('MatDateRangeFieldComponent', () => {
  let component: MatDateRangeFieldComponent;
  let fixture: ComponentFixture<MatDateRangeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDateRangeFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDateRangeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
