import { Injectable } from '@angular/core';
import {Doctor} from './doctor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {Appointment} from '../../appointment/shared/Appointment';
import {FilterModel} from '../../shared/filter/filter.model';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorsApiUrl = environment.webAPI_URL + 'doctors';

  constructor(private http: HttpClient, private auth: AuthService) { }

  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Doctor> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  doctor: Doctor = {
    firstName: 'Error',
    lastName: 'Error',
    doctorEmailAddress: 'Error',
    phoneNumber: 'Error',
    isAdmin: false
  };

  GetAll(filter?: FilterModel): Observable<FilteredListModel<Doctor>> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());

    let url = environment.webAPI_URL + 'Doctors' + '?';

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
    return this.http.get<FilteredListModel<Doctor>>(url ,httpOptions);
  }

  GetById(email: string): Observable<Doctor>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Doctor>(this.doctorsApiUrl + '/' + email, httpOptions);
  }

  create(doctor: Doctor): Observable<Doctor>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.post<Doctor>(this.doctorsApiUrl, doctor, httpOptions);
  }

  edit(doctor: Doctor): Observable<Doctor>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.put<Doctor>(this.doctorsApiUrl, doctor, httpOptions);
  }

  remove(email: string): Observable<Doctor>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.delete<Doctor>(this.doctorsApiUrl + '/' + email, httpOptions);
  }
}
