import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../shared/appointment.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../patient/shared/Patient';
import {Doctor} from '../../doctor/shared/doctor.model';
import {PatientService} from '../../patient/shared/patient.service';
import {DoctorService} from '../../doctor/shared/doctor.service';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';
import validate = WebAssembly.validate;
import {AuthService} from '../../shared/authentication/auth.service';

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
  patientObservable$: Observable<FilteredListModel<Patient>>;
  doctorObservable$: Observable<FilteredListModel<Doctor>>;
  return: string;
  doctorList: Doctor[];
  patientList: Patient[];
  Errorappointment: Appointment = {appointmentDateTime: new Date(),
    appointmentId: 1,
    description: 'Error',
    doctorEmailAddress: 'Error',
    durationInMin: 15,
    patientCpr: '',
  };

  filter: FilterModel = {};
  PatientFilteredList: FilteredListModel<Patient> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
 DoctorFilteredList: FilteredListModel<Doctor> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  appointmentForm = new FormGroup( {
    DurationInMin: new FormControl('', Validators.required),
    Description: new FormControl('' ),
    FK_PatientCPR: new FormControl('' ),
    FK_DoctorId: new FormControl('' , Validators.required)
  });
  submitted = false;
  loading = false;
  errormessage = '';
  error: any;
  subscription: Subscription;
  id: number;
  role = '';

  constructor(private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private doctorService: DoctorService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }



  // Getters for easy access to form fields
  get DurationInMin(): AbstractControl { return this.appointmentForm.get('DurationInMin'); }
  get Description(): AbstractControl { return this.appointmentForm.get('Description'); }
  get FK_PatientCPR(): AbstractControl { return this.appointmentForm.get('FK_PatientCPR'); }
  get FK_DoctorId(): AbstractControl { return this.appointmentForm.get('FK_DoctorId'); }


  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.dateModel = new NgbDate(2020 , 12, 9);
    this.timeModel = {hour: 13, minute: 30};
    this.return = this.route.snapshot.paramMap.get('return');

    //  Initialize the form group
    this.appointmentForm = this.formBuilder.group({
      DurationInMin: ['', Validators.required],
      Description: ['', ],
      FK_PatientCPR: ['', ],
      FK_DoctorId: ['', Validators.required],
    });


    this.patientObservable$ = this.patientService.getPatients().pipe(

      tap(filteredList => {
        this.error = undefined;
        this.patientList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.patientList = this.PatientFilteredList.list;
        return of(this.PatientFilteredList);
      })
    );

    this.doctorObservable$ = this.doctorService.GetAll().pipe(

      tap(filteredList => {
        this.error = undefined;
        this.doctorList = filteredList.list;
      } ),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.patientList = this.PatientFilteredList.list;
        return of(this.DoctorFilteredList);
    })
    );

    this.getAppointment();



  }

  save(): void {
    this.submitted = true;


    if (this.appointmentForm.invalid) {
      return;
    }

    const date = moment()
      .date(this.dateModel.day)
      .month(this.dateModel.month - 1)
      .year(this.dateModel.year)
      .hour(this.timeModel.hour + 1)
      .minute(this.timeModel.minute)
      .second(0).
      toDate();

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
        this.error = undefined;
        this.loading = false;
        this.id = +this.route.snapshot.paramMap.get('id');
        this.router.navigateByUrl('/appointment-detail/' + this.id + '/' + this.return);
      } ,
      error => {
        this.error = error.error ?? error.message;
        return of(this.Errorappointment);
      }
    );
  }

  getAppointment(): void
  {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.appointmentService
      .getAppointmentById(this.id)
      .subscribe(appointment => {
        this.error = undefined;
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
          error => {
            this.error = error.error ?? error.message;
            return of(this.Errorappointment);
      });

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


  back(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl('/appointment-detail/' + this.id + '/' + this.return);
  }
}
