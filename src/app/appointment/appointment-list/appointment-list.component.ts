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
  constructor(private appointmentservice: AppointmentService) { }

  ngOnInit(): void {

    this.appointment$ = this.appointmentservice.getAppointments().pipe(

      tap(filteredList => {
        this.appointments = filteredList.list;
      }),
      catchError(this.err)
    );

  }

}
