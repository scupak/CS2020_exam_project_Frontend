import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../appointment/shared/Appointment';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]>
  {
    return this.http.get<Appointment[]>(environment.webAPI_URL + 'Appointments');
  }

  addAppointment(appointment: Appointment): Observable<Appointment>
  {
    return this.http.post<Appointment>(environment.webAPI_URL + 'Appointments', appointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment>
  {
    return this.http.put<Appointment>(environment.webAPI_URL + 'Appointments', appointment);
  }

  getAppointmentById(id: number): Observable<Appointment>
  {
    return this.http.get<Appointment>(environment.webAPI_URL + 'Appointments/' + id);
  }

  removeAppointment(id: number): Observable<Appointment>
  {
    return this.http.delete<Appointment>(environment.webAPI_URL + 'Appointments/' + id);
  }
}
