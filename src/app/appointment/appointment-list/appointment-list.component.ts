import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
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

  appointment$: Observable<FilteredListModel<Appointment>>;
  appointments: Appointment[];
  orderStartDateTime: NgbDateStruct;
  orderStopDateTime: NgbDateStruct;
  count: number;
  date: {year: number, month: number};
  err: any;
  errorMessage: string;
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
              private calendar: NgbCalendar) { }

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
  }

  getAppointments(currentPage: number = 0): void
  {
    this.appointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.count = filteredList.totalCount;
        this.appointments = filteredList.list;
      }),
      catchError(err => {
        this.err = err.error ?? err.message;
        return of(this.filteredList);
      }));
  }

  openDatepicker(d1: NgbInputDatepicker): void {
    d1.close();
  }

  closeDatepicker(d1: NgbInputDatepicker): void {
    d1.open();
  }
  search(): void{
    this.submitted = true;
    if (this.orderStopDateTime !== undefined && this.orderStartDateTime !== undefined)
    {
      this.FromDate = moment()
        .date(this.orderStartDateTime.day)
        .month(this.orderStartDateTime.month - 1)
        .year(this.orderStartDateTime.year)
        .hour(1)
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
        { currentPage: 1,
          itemsPrPage: 10,
          orderDirection: this.orderDirection.value,
          orderProperty: this.orderProperty.value,
          searchField: this.searchField.value,
          searchText: this.searchText.value,
          orderStartDateTime: moment(this.FromDate).format('YYYY-MM-DDThh:mm:ss'),
          orderStopDateTime: moment(this.ToDate).format('YYYY-MM-DDThh:mm:ss')
        };
    }
    else {
      this.filter =
        { currentPage: 1,
          itemsPrPage: 10,
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
