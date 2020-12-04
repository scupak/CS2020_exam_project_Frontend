import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestComponent } from './patient-test.component';

describe('PatientTestComponent', () => {
  let component: PatientTestComponent;
  let fixture: ComponentFixture<PatientTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
