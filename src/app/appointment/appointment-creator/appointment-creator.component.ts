import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.scss']
})
export class AppointmentCreatorComponent implements OnInit {
  appointmentForm = new FormGroup( {
    AppointmentDateTime: new FormControl('', Validators.required),
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' , Validators.required),
    FK_PatientCPR: new FormControl('', Validators.required),
    FK_DoctorId: new FormControl('' , Validators.required)
  });
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe) { }



  // Getters for easy access to form fields
  get AppointmentDateTime(): AbstractControl { return this.appointmentForm.get('AppointmentDateTime'); }
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {
  }

  save(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.appointmentForm.invalid) {
      return;
    }
    this.appointmentForm.value.AppointmentDateTime = this.datePipe.transform(this.AppointmentDateTime.value, 'yyyy-MM-dd');
    const appointment = { PK_AppointmentId: 0,
                          AppointmentDateTime: this.AppointmentDateTime.value,
                          DurationInMin: this.DurationInMin.value,
                          Description: this.Description.value,
                          FK_PatientCPR: this.FK_PatientCPR.value,
                          FK_DoctorId: this.FK_DoctorId.value};

    this.loading = true;
    this.appointmentService.addAppointment(appointment).pipe(take(1)).subscribe(
      succes => {
        this.loading = false;
        this.errormessage = 'Success';
      } ,
      error => {
        this.errormessage = error.message;
        this.loading = false;
      }
    );
  }

}
