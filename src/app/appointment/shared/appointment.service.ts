import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../appointment/shared/Appointment';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../shared/authentication/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAppointments(): Observable<Appointment[]>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Appointment[]>(environment.webAPI_URL + 'Appointments', httpOptions);
  }

  addAppointment(appointment: Appointment): Observable<Appointment>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.post<Appointment>(environment.webAPI_URL + 'Appointments', appointment, httpOptions);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.put<Appointment>(environment.webAPI_URL + 'Appointments', appointment, httpOptions);
  }

  getAppointmentById(id: number): Observable<Appointment>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Appointment>(environment.webAPI_URL + 'Appointments/' + id, httpOptions);
  }

  removeAppointment(id: number): Observable<Appointment>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.delete<Appointment>(environment.webAPI_URL + 'Appointments/' + id, httpOptions);
  }
}
