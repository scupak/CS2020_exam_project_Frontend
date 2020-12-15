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
import {NgbDateStruct, NgbCalendar, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {DEBUG} from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

role = '';
appointment$: Observable<FilteredListModel<Appointment>>;
  appointments: Appointment[];
  orderStartDateTime: NgbDateStruct;
  orderStopDateTime: NgbDateStruct;
  count: number;
  date: {year: number, month: number};
  error: any;
  subscription: Subscription;
  submitted = false;
  loading = false;
  FromDate: Date;
  ToDate: Date;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Appointment> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  FilterForm = new FormGroup({
    itemsPrPage: new FormControl(''),
    currentPage: new FormControl(''),
    orderDirection: new FormControl(''),
    orderProperty: new FormControl(''),
    searchField: new FormControl(''),
    searchText: new FormControl('')
  });
  constructor(private appointmentservice: AppointmentService,
              private datePipe: DatePipe,
              private calendar: NgbCalendar,
              private authService: AuthService) { }

  get searchText(): AbstractControl { return this.FilterForm.get('searchText'); }
  get searchField(): AbstractControl { return this.FilterForm.get('searchField'); }
  get orderProperty(): AbstractControl { return this.FilterForm.get('orderProperty'); }
  get orderDirection(): AbstractControl { return this.FilterForm.get('orderDirection'); }
  get itemsPrPage(): number { return (this.FilterForm.value as FilterModel).itemsPrPage; }
  get currentPage(): number { return (this.FilterForm.value as FilterModel).currentPage; }
  get maxPages(): number { return Math.ceil(this.count / this.itemsPrPage); }

  ngOnInit(): void {
    this.FilterForm.patchValue(this.filter);
    this.getAppointments();
    this.role = this.authService.getRole();
  }

  getAppointments(): void
  {
    this.appointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.count = filteredList.totalCount;
        this.appointments = filteredList.list;
      }),
      catchError(error => {
        this.error = error.error ?? error.message;
        this.count = this.filteredList.totalCount;
        this.appointments = this.filteredList.list;
        return of(this.filteredList);
      }));

  }

  openDatepicker(d1: NgbInputDatepicker): void {
    d1.close();
  }

  closeDatepicker(d1: NgbInputDatepicker): void {
    d1.open();
  }
  search(currentPage: number = 0): void{
    if (currentPage > 0) {
      this.FilterForm.patchValue({currentPage});
    }
    this.submitted = true;
    if (this.orderStopDateTime !== undefined && this.orderStartDateTime !== undefined)
    {
      this.FromDate = moment()
        .date(this.orderStartDateTime.day)
        .month(this.orderStartDateTime.month - 1)
        .year(this.orderStartDateTime.year)
        .hour(0)
        .minute(0)
        .second(0)
        .toDate();

      this.ToDate = moment()
        .date(this.orderStopDateTime.day)
        .month(this.orderStopDateTime.month - 1)
        .year(this.orderStopDateTime.year)
        .hour(23)
        .minute(59)
        .second(59)
        .toDate();

      this.filter =
        { currentPage: this.currentPage,
          itemsPrPage: this.itemsPrPage,
          orderDirection: this.orderDirection.value,
          orderProperty: this.orderProperty.value,
          searchField: this.searchField.value,
          searchText: this.searchText.value,
          orderStartDateTime: moment(this.FromDate).format('YYYY-MM-DDTHH:mm:ss'),
          orderStopDateTime: moment(this.ToDate).format('YYYY-MM-DDTHH:mm:ss')
        };
    }
    else {
      this.filter =
        { currentPage: this.currentPage,
          itemsPrPage: this.itemsPrPage,
          orderDirection: this.orderDirection.value,
          orderProperty: this.orderProperty.value,
          searchField: this.searchField.value,
          searchText: this.searchText.value
        };
    }
    if (this.filter.currentPage <= 0){
      this.filter.currentPage = 1;
    }
    if (this.filter.itemsPrPage <= 0){
      this.filter.itemsPrPage = 1;
    }

    this.getAppointments();
  }
}
