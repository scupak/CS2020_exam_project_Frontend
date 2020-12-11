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
  datePicker1Model: NgbDateStruct;
  datePicker2Model: NgbDateStruct;
  count: number;
  date: {year: number, month: number};
  err: any;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 1};
  FilterForm = new FormGroup({
    orderDirection: new FormControl(''),
    orderProperty: new FormControl(''),
    searchField: new FormControl(''),
    searchText: new FormControl('')
  });
  constructor(private appointmentservice: AppointmentService,
              private datePipe: DatePipe,
              private calendar: NgbCalendar) { }

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
}
