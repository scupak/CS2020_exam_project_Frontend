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
  submitted = false;
  loading = false;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 1};
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

  getAppointments(): void
  {
    this.appointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.count = filteredList.totalCount;
        this.appointments = filteredList.list;
      }),
      catchError(this.err)
    );
  }


  openDatepicker(d1: NgbInputDatepicker): void {
    d1.close();
  }

  closeDatepicker(d1: NgbInputDatepicker): void {
    d1.open();
  }
  search(): void{
    this.submitted = true;
    const fromDate = moment()
      .date(this.orderStartDateTime.day)
      .month(this.orderStartDateTime.month - 1)
      .year(this.orderStartDateTime.year)
      .toDate();

    const toDate = moment()
      .date(this.orderStopDateTime.day)
      .month(this.orderStopDateTime.month - 1)
      .year(this.orderStopDateTime.year)
      .toDate();
    this.filter =
      { currentPage: this.currentPage,
        itemsPrPage: this.itemsPrPage,
        orderDirection: this.orderDirection.value,
        orderProperty: this.orderProperty.value,
        searchField: this.searchField.value,
        searchText: this.searchText.value,
        orderStartDateTime: fromDate,
        orderStopDateTime: toDate
      };
    if (this.filter.currentPage <= 0){
      this.filter.currentPage = 1;
    }
    if (this.filter.itemsPrPage <= 0){
      this.filter.itemsPrPage = 1;
    }
    this.getAppointments();
  }
}
