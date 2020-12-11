import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {catchError, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointment$: Observable<FilteredListModel<Appointment>>;
  appointments: Appointment[];

  err: any;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 1};
  constructor(private appointmentservice: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void
  {
    this.appointment$ = this.appointmentservice.getAppointments(this.filter).pipe(

      tap(filteredList => {
        this.appointments = filteredList.list;
      }),
      catchError(this.err)
    );
  }

}
