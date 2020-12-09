import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, take, tap} from 'rxjs/operators';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Observable, of} from 'rxjs';
import {Patient} from '../../patient/shared/Patient';
import {Doctor} from '../../doctor/shared/doctor.model';
import {PatientService} from '../../patient/shared/patient.service';
import {DoctorService} from '../../doctor/shared/doctor.service';

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.scss']
})
export class AppointmentCreatorComponent implements OnInit {
  patientObservable$: Observable<Patient[]>;
  doctorObservable$: Observable<Doctor[]>;
  dateModel: NgbDateStruct;
  timeModel = {hour: 0, minute: 0};
  date: {year: number, month: number};
  err: any;

  appointmentForm = new FormGroup( {
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' ),
    FK_PatientCPR: new FormControl('' ),
    FK_DoctorId: new FormControl('' )
  });
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private appointmentService: AppointmentService, private patientService: PatientService, private doctorService: DoctorService, private datePipe: DatePipe, private calendar: NgbCalendar ) { }



  // Getters for easy access to form fields
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {
    this.patientObservable$ = this.patientService.getPatients().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        this.errormessage = err.message;
        return of([]);
      })
    );

    this.doctorObservable$ = this.doctorService.GetAll().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        this.errormessage = err.message;
        return of([]);
      })
    );
  }

  save(): void {
    this.submitted = true;

    /*
    console.log(this.dateModel);
    console.log(this.timeModel);*/


    // new Date ( year, month, date[, hour, minute, second, millisecond ])
/*
    console.log(this.dateModel.year);
    console.log(this.dateModel.month);
    console.log(this.dateModel.day);*/

    //const datetime = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute);
   // console.log(datetime + 'det er rigtig');
/*
    datetime.setFullYear(this.dateModel.year);
    datetime.setMonth(this.dateModel.month);
    datetime.setDate(this.dateModel.day);
    console.log(datetime.getMonth());*/


    if (this.appointmentForm.invalid) {
      return;
    }
    // this.appointmentForm.value.AppointmentDateTime = this.datePipe.transform(this.AppointmentDateTime.value, 'yyyy-MM-dd');

   // const datetime1 = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour + 1, this.timeModel.minute);


    // we write month -1 cause months start at 0. We write hour + 1 to get the correct time.
    const date = moment().date(this.dateModel.day).month(this.dateModel.month - 1).year(this.dateModel.year).hour(this.timeModel.hour + 1).minute(this.timeModel.minute).second(0).toDate();
    const appointment = { appointmentId: 0,
                          appointmentDateTime: date ,
                          durationInMin: this.DurationInMin.value,
                          description: this.Description.value,
                          patientCpr: this.FK_PatientCPR.value,
                          doctorEmailAddress: this.FK_DoctorId.value,
                          doctor: null,
                          patient: null};


   // console.log(appointment.appointmentDateTime + 'date i appointment');

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
