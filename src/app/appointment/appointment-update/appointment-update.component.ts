import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {switchMap, take, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.scss']
})
export class AppointmentUpdateComponent implements OnInit {
  dateModel: NgbDateStruct;
  timeModel = {hour: 0, minute: 0};
  date: {year: number, month: number};
  AppointmentObservable$: Observable<Appointment>;
  previousAppointment: Appointment;

  appointmentForm = new FormGroup( {
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' ),
    FK_PatientCPR: new FormControl('' ),
    FK_DoctorId: new FormControl('' )
  });
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe, private calendar: NgbCalendar, private route: ActivatedRoute) { }



  // Getters for easy access to form fields
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {
  }

  save(): void {
    this.submitted = true;


    if (this.appointmentForm.invalid) {
      return;
    }
    const date = moment().date(this.dateModel.day).month(this.dateModel.month - 1).year(this.dateModel.year).hour(this.timeModel.hour + 1).minute(this.timeModel.minute).second(0).toDate();
    const appointment = { appointmentId: this.previousAppointment.appointmentId,
      appointmentDateTime: date ,
      durationInMin: this.DurationInMin.value,
      description: this.Description.value,
      patientCpr: this.FK_PatientCPR.value,
      doctorEmailAddress: this.FK_DoctorId.value,
      doctor: null,
      patient: null};

    this.loading = true;
    this.appointmentService.addAppointment(appointment).pipe(take(1)).subscribe(
      success => {
        this.loading = false;
        this.errormessage = 'Success';
      } ,
      error => {
        this.errormessage = error.message;
        this.loading = false;
      }
    );
  }

  getAppointment(): void
  {
    this.AppointmentObservable$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        const id = +params.get('id');
        return this.appointmentService.getAppointmentById(id);
      }),
    tap(appointment => {
      this.previousAppointment = appointment;
      this.appointmentForm.patchValue(appointment);

      this.timeModel.hour = appointment.appointmentDateTime.getHours();
      this.timeModel.minute = appointment.appointmentDateTime.getMinutes();

      this.dateModel.day = appointment.appointmentDateTime.getDay();
      this.dateModel.month = appointment.appointmentDateTime.getMonth();
      this.dateModel.year = appointment.appointmentDateTime.getFullYear();
    }));
  }

}
