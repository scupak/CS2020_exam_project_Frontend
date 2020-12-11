import { Injectable } from '@angular/core';
import {Doctor} from './doctor.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {Appointment} from '../../appointment/shared/Appointment';
import {FilterModel} from '../../shared/filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorsApiUrl = environment.webAPI_URL + 'doctors';

  constructor(private http: HttpClient) { }

  GetAll(filter?: FilterModel): Observable<FilteredListModel<Doctor>> {
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
    if (filter && filter.searchField?.length > 0 && filter.searchText?.length > 0)
    {
      url = url
        + 'searchField=' + filter.searchText
        + '&searchText=' + filter.searchField + '&';
    }
    return this.http.get<FilteredListModel<Doctor>>(url);
  }

  GetById(email: string): Observable<Doctor>{
    return this.http.get<Doctor>(this.doctorsApiUrl + '/' + email);
  }

  create(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(this.doctorsApiUrl, doctor);
  }

  edit(doctor: Doctor): Observable<Doctor>{
    return this.http.put<Doctor>(this.doctorsApiUrl, doctor);
  }

  remove(email: string): Observable<Doctor>{
    return this.http.delete<Doctor>(this.doctorsApiUrl + '/' + email);
  }
}
