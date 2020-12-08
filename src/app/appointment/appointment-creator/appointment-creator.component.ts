import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.scss']
})
export class AppointmentCreatorComponent implements OnInit {
  dateModel: NgbDateStruct;
  timeModel = {hour: 0, minute: 0};
  date: {year: number, month: number};

  appointmentForm = new FormGroup( {
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' , Validators.required),
    FK_PatientCPR: new FormControl('', Validators.required),
    FK_DoctorId: new FormControl('' , Validators.required)
  });
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe, private calendar: NgbCalendar ) { }



  // Getters for easy access to form fields
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {
  }

  save(): void {
    this.submitted = true;
    console.log(this.dateModel);
    console.log(this.timeModel);


    // new Date ( year, month, date[, hour, minute, second, millisecond ])

    console.log(this.dateModel.year);
    console.log(this.dateModel.month);
    console.log(this.dateModel.day);
    const datetime = new Date(this.dateModel.year, this.dateModel.month, this.dateModel.day);
    console.log(datetime);

    datetime.setFullYear(this.dateModel.year);
    datetime.setMonth(this.dateModel.month);
    datetime.setDate(this.dateModel.day);
    console.log(datetime.getMonth());

    console.log(this.datePipe.transform(this.dateModel.year + ','  + this.dateModel.month + ','  + this.dateModel.day, 'yyyy-MM-dd'));
   /* console.log(this.AppointmentDateTime.value);
    console.log(this.AppointmentTime.value);*/
    // stop here if form is invalid
    if (this.appointmentForm.invalid) {
      return;
    }


    // this.appointmentForm.value.AppointmentDateTime = this.datePipe.transform(this.AppointmentDateTime.value, 'yyyy-MM-dd');

    const appointment = { PK_AppointmentId: 0,
                          AppointmentDateTime: null,
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
