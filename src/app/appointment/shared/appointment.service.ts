import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../appointment/shared/Appointment';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../shared/authentication/auth.service';
import {FilterModel} from '../../shared/filter/filter.model';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {catchError, tap} from 'rxjs/operators';

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

  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Appointment> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  appointment: Appointment = {appointmentDateTime: new Date(),
    appointmentId: 1,
    description: 'Error',
    doctorEmailAddress: 'Error',
    durationInMin: 15,
    patientCpr: '',
  };

  getAppointments(filter?: FilterModel): Observable<FilteredListModel<Appointment>>
  {
httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());  
 let url = environment.webAPI_URL + 'Appointments' + '?';
    if (filter && filter.orderDirection?.length > 0 && filter.orderProperty?.length > 0)
    {
      url = url
      + 'orderDirection=' + filter.orderDirection
      + '&orderProperty=' + filter.orderProperty + '&';
    }
    if (filter && filter.itemsPrPage > 0 && filter.currentPage > 0)
    {
      url = url
      + 'ItemsPrPage=' + filter.itemsPrPage
      + '&CurrentPage=' + filter.currentPage + '&';
    }
    if (filter && filter.searchField?.length > 0)
    {
      url = url
      + 'searchField=' + filter.searchField
      + '&searchText=' + filter.searchText + '&';
    }
    if (filter && filter.searchField2?.length > 0)
    {
      url = url
        + 'searchField2=' + filter.searchField2
        + '&searchText2=' + filter.searchText2 + '&';
    }
    if (filter && filter.orderStartDateTime != null && filter.orderStopDateTime != null)
    {
      url = url
      + 'orderStartDateTime=' + filter.orderStartDateTime
      + '&orderStopDateTime=' + filter.orderStopDateTime + '&';
    }
    return this.http.get<FilteredListModel<Appointment>>(url ,  httpOptions);
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
