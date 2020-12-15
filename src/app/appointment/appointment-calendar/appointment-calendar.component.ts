import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {AuthService} from '../../shared/authentication/auth.service';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NgbDateStruct, NgbCalendar, NgbInputDatepicker, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  role = '';
  mondayAppointment$: Observable<FilteredListModel<Appointment>>;
  mondayAppointmentsList: Appointment[];
  tuesdayAppointment$: Observable<FilteredListModel<Appointment>>;
  tuesdayAppointmentsList: Appointment[];
  wednesdayAppointment$: Observable<FilteredListModel<Appointment>>;
  wednesdayAppointmentsList: Appointment[];
  thursdayAppointment$: Observable<FilteredListModel<Appointment>>;
  thursdayAppointmentsList: Appointment[];
  fridayAppointment$: Observable<FilteredListModel<Appointment>>;
  fridayAppointmentsList: Appointment[];
  filter: FilterModel = {};
  WeekSelectorDateTime: NgbDate;
  date: {year: number, month: number};
  error: any;
  errorMessage: string;
  NotFound = 'Could not find entityCould not find appointments that satisfy the filter';
  Week: number;
  Monday: Date;
  FromDateMonday: string;
  ToDateMonday: string;
  Date3: string;
  Errorfilter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  ErrorfilteredList: FilteredListModel<Appointment> = {
    totalCount: 0,
    list: [],
    filterUsed: this.Errorfilter};
  FromDate: Date;
  ToDate: Date;
  constructor(private appointmentservice: AppointmentService,
              private datePipe: DatePipe,
              private calendar: NgbCalendar,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.WeekSelectorDateTime = this.calendar.getToday();
    this.getAppointments();
  }

  fixDate(dateToFix: Date): string
  {
    return moment(dateToFix).format('YYYY-MM-DD - HH:mm:ss');
  }

  getAppointments(): void
  {
    this.FromDate = moment()
      .date(this.WeekSelectorDateTime.day)
      .month(this.WeekSelectorDateTime.month - 1)
      .year(this.WeekSelectorDateTime.year)
      .hour(0)
      .minute(0)
      .second(0)
      .toDate();

    this.ToDate = moment()
      .date(this.WeekSelectorDateTime.day)
      .month(this.WeekSelectorDateTime.month - 1)
      .year(this.WeekSelectorDateTime.year)
      .hour(23)
      .minute(59)
      .second(59)
      .toDate();
    this.Monday = moment(this.FromDate).startOf('isoWeek').toDate();
    this.FromDateMonday = moment(this.Monday).hour(0).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ss');
    this.ToDateMonday = moment(this.Monday).hour(23).minute(59).second(59).format('YYYY-MM-DDTHH:mm:ss');
    // this.Date3 = moment(this.Monday).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
    this.filter =
      {
        orderDirection: 'ASC',
        orderProperty: 'AppointmentDateTime',
        searchField: 'DoctorEmailAddress',
        searchText: this.authService.getUsername(),
        orderStartDateTime: this.FromDateMonday,
        orderStopDateTime: this.ToDateMonday
      };

    this.mondayAppointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.mondayAppointmentsList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.errorMessage = this.error;
        this.mondayAppointmentsList = this.ErrorfilteredList.list;
        return of(this.ErrorfilteredList);
      }));

    this.filter =
      {
        orderDirection: 'ASC',
        orderProperty: 'AppointmentDateTime',
        searchField: 'DoctorEmailAddress',
        searchText: this.authService.getUsername(),
        orderStartDateTime: moment(this.FromDateMonday).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss'),
        orderStopDateTime: moment(this.ToDateMonday).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss')
      };

    this.tuesdayAppointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.tuesdayAppointmentsList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.errorMessage = this.error;
        this.tuesdayAppointmentsList = this.ErrorfilteredList.list;
        return of(this.ErrorfilteredList);
      }));

    this.filter =
      {
        orderDirection: 'ASC',
        orderProperty: 'AppointmentDateTime',
        searchField: 'DoctorEmailAddress',
        searchText: this.authService.getUsername(),
        orderStartDateTime: moment(this.FromDateMonday).add(2, 'days').format('YYYY-MM-DDTHH:mm:ss'),
        orderStopDateTime: moment(this.ToDateMonday).add(2, 'days').format('YYYY-MM-DDTHH:mm:ss')
      };

    this.wednesdayAppointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.wednesdayAppointmentsList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.errorMessage = this.error;
        this.wednesdayAppointmentsList = this.ErrorfilteredList.list;
        return of(this.ErrorfilteredList);
      }));
    this.filter =
      {
        orderDirection: 'ASC',
        orderProperty: 'AppointmentDateTime',
        searchField: 'DoctorEmailAddress',
        searchText: this.authService.getUsername(),
        orderStartDateTime: moment(this.FromDateMonday).add(3, 'days').format('YYYY-MM-DDTHH:mm:ss'),
        orderStopDateTime: moment(this.ToDateMonday).add(3, 'days').format('YYYY-MM-DDTHH:mm:ss')
      };

    this.thursdayAppointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.thursdayAppointmentsList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.errorMessage = this.error;
        this.thursdayAppointmentsList = this.ErrorfilteredList.list;
        return of(this.ErrorfilteredList);
      }));
    this.filter =
      {
        orderDirection: 'ASC',
        orderProperty: 'AppointmentDateTime',
        searchField: 'DoctorEmailAddress',
        searchText: this.authService.getUsername(),
        orderStartDateTime: moment(this.FromDateMonday).add(4, 'days').format('YYYY-MM-DDTHH:mm:ss'),
        orderStopDateTime: moment(this.ToDateMonday).add(4, 'days').format('YYYY-MM-DDTHH:mm:ss')
      };

    this.fridayAppointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.fridayAppointmentsList = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.errorMessage = this.error;
        this.fridayAppointmentsList = this.ErrorfilteredList.list;
        return of(this.ErrorfilteredList);
      }));
    }
}
