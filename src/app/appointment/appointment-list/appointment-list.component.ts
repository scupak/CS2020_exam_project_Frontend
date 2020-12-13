import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {catchError, tap} from 'rxjs/operators';
import {Appointment} from '../shared/Appointment';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointment$: Observable<Appointment[]>;
  err: string;
  role = '';
  constructor(private appointmentservice: AppointmentService, private authService: AuthService) { }


  ngOnInit(): void {

    this.role = this.authService.getRole();
    this.appointment$ = this.appointmentservice.getAppointments().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        return of([]);
      })
    );

  }

}
