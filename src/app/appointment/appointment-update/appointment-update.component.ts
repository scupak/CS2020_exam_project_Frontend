import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../patient/shared/Patient';
import {Doctor} from '../../doctor/shared/doctor.model';
import {PatientService} from '../../patient/shared/patient.service';
import {DoctorService} from '../../doctor/shared/doctor.service';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.scss']
})
export class AppointmentUpdateComponent implements OnInit , OnDestroy {
  dateModel: NgbDateStruct;
  timeModel = {hour: 0, minute: 0};
  date: {year: number, month: number};
  AppointmentObservable$: Observable<Appointment>;
  previousAppointment: Appointment;
  patientObservable$: Observable<Patient[]>;
  doctorObservable$: Observable<Doctor[]>;

  appointmentForm = new FormGroup( {
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' ),
    FK_PatientCPR: new FormControl('' ),
    FK_DoctorId: new FormControl('' )
  });
  submitted = false;
  loading = false;
  errormessage = '';
  err: any;
  subscription: Subscription;
  id: number;

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe, private calendar: NgbCalendar, private route: ActivatedRoute,  private patientService: PatientService, private doctorService: DoctorService, private formBuilder: FormBuilder ) { }



  // Getters for easy access to form fields
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {

    this.dateModel = new NgbDate(2020 , 12, 9);
    this.timeModel = {hour: 13, minute: 30};

    //  Initialize the form group
    this.appointmentForm = this.formBuilder.group({
      DurationInMin: ['', Validators.required],
      Description: ['', ],
      FK_PatientCPR: ['', ],
      FK_DoctorId: ['', ],
    });


    this.patientObservable$ = this.patientService.getPatients().pipe(

      tap(() => {
        this.err = undefined;


      } ),
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

    this.getAppointment();



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
    this.appointmentService.updateAppointment(appointment).pipe(take(1)).subscribe(
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
    this.id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.appointmentService
      .getAppointmentById(this.id)
      .subscribe(appointment => {
        this.previousAppointment = appointment;
        this.appointmentForm.patchValue({
          DurationInMin: appointment.durationInMin,
          Description: appointment.description,
          FK_PatientCPR: appointment.patientCpr,
          FK_DoctorId: appointment.doctorEmailAddress
          });

        console.log(appointment.appointmentDateTime);
        const d = new Date(appointment.appointmentDateTime);
        console.log(d);

        this.dateModel = {year: d.getFullYear() , month:  d.getMonth() + 1, day: d.getDate()};
        this.timeModel = {hour: d.getHours(), minute: d.getMinutes()};



/*

        this.timeModel.hour = appointment.appointmentDateTime.getHours();
        this.timeModel.minute = appointment.appointmentDateTime.getMinutes();


        this.dateModel.day = appointment.appointmentDateTime.getDay();
        this.dateModel.month = appointment.appointmentDateTime.getMonth();
        this.dateModel.year = appointment.appointmentDateTime.getFullYear();

*/


        },
          error => {this.errormessage = error.message; });

/*
    console.log('stuff');

this.AppointmentObservable$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        const id = +params.get('id');
        return this.appointmentService.getAppointmentById(id);
      }),
    tap(appointment => {
      this.previousAppointment = appointment;


      /*
      this.appointmentForm.patchValue(appointment);


      this.timeModel.hour = appointment.appointmentDateTime.getHours();
      this.timeModel.minute = appointment.appointmentDateTime.getMinutes();

      this.dateModel.day = appointment.appointmentDateTime.getDay();
      this.dateModel.month = appointment.appointmentDateTime.getMonth();
      this.dateModel.year = appointment.appointmentDateTime.getFullYear();
*/

/*

    }));
  */
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }


}
