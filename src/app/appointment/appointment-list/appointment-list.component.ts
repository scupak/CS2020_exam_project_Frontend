import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {catchError, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointment$: Observable<Appointment[]>;
  err: string;
  constructor(private appointmentservice: AppointmentService) { }

  ngOnInit(): void {

    this.appointment$ = this.appointmentservice.getAppointments().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        return of([]);
      })
    );

  }

}
