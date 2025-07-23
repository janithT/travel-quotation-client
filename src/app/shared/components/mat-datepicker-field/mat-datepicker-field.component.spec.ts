import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatepickerFieldComponent } from './mat-datepicker-field.component';

describe('MatDatepickerFieldComponent', () => {
  let component: MatDatepickerFieldComponent;
  let fixture: ComponentFixture<MatDatepickerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDatepickerFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDatepickerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
