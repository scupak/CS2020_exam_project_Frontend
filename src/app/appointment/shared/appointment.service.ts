import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Appointment} from '../../appointment/shared/Appointment';
import {environment} from '../../../environments/environment';
import {FilterModel} from '../../shared/filter/filter.model';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

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
    if (filter && filter.searchField?.length > 0 && filter.searchText?.length > 0)
    {
      url = url
      + 'searchField=' + filter.searchField
      + '&searchText=' + filter.searchText + '&';
    }
    if (filter && filter.orderStartDateTime != null && filter.orderStopDateTime != null)
    {
      url = url
      + 'orderStartDateTime=' + filter.orderStartDateTime
      + '&orderStopDateTime=' + filter.orderStopDateTime + '&';
    }
    return this.http.get<FilteredListModel<Appointment>>(url);
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
