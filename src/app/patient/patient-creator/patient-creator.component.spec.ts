import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreatorComponent } from './patient-creator.component';

describe('PatientCreatorComponent', () => {
  let component: PatientCreatorComponent;
  let fixture: ComponentFixture<PatientCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
