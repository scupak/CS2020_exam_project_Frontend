import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Patient} from './Patient';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {Doctor} from '../../doctor/shared/doctor.model';
import {FilterModel} from '../../shared/filter/filter.model';
import {catchError} from 'rxjs/operators';
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
export class PatientService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Patient> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  patient: Patient = {
    patientCPR: 'Error',
    patientEmail: 'Error',
    patientFirstName: 'Error',
    patientLastName: 'Error',
    patientPhone: 'Error'
  };
  getPatients(filter?: FilterModel): Observable<FilteredListModel<Patient>>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    let url = environment.webAPI_URL + 'Patients' + '?';

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
    return this.http.get<FilteredListModel<Patient>>(url ,httpOptions);
  }

  addPatient(patient: Patient): Observable<Patient>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.post<Patient>(environment.webAPI_URL + 'Patients', patient, httpOptions);
  }

  updatePatient(patient: Patient): Observable<Patient>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.put<Patient>(environment.webAPI_URL + 'Patients', patient, httpOptions);
  }

  getPatientById(id: string): Observable<Patient>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Patient>(environment.webAPI_URL + 'Patients/' + id, httpOptions);
  }

  removePatient(id: string): Observable<Patient>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.delete<Patient>(environment.webAPI_URL + 'Patients/' + id, httpOptions);
  }

}
