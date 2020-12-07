import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCreatorComponent } from './appointment-creator.component';

describe('AppointmentCreatorComponent', () => {
  let component: AppointmentCreatorComponent;
  let fixture: ComponentFixture<AppointmentCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
