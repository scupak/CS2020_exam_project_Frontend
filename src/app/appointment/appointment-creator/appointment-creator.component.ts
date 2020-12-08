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
    FK_PatientCPR: new FormControl('' ),
    FK_DoctorId: new FormControl('' )
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
    const datetime = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute);
    console.log(datetime + 'det er rigtig');
/*
    datetime.setFullYear(this.dateModel.year);
    datetime.setMonth(this.dateModel.month);
    datetime.setDate(this.dateModel.day);
    console.log(datetime.getMonth());*/

 debugger;
    if (this.appointmentForm.invalid) {
      return;
    }


    // this.appointmentForm.value.AppointmentDateTime = this.datePipe.transform(this.AppointmentDateTime.value, 'yyyy-MM-dd');

    const datetime1 = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute);

    console.log(datetime1 + 'det er det andet');
    const appointment = { appointmentId: 0,
                          appointmentDateTime: datetime1,
                          durationInMin: this.DurationInMin.value,
                          description: this.Description.value,
                          patientCpr: this.FK_PatientCPR.value,
                          doctorEmailAddress: this.FK_DoctorId.value,
                          doctor: null,
                          patient: null};

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
