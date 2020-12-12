import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Patient} from './Patient';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {Doctor} from '../../doctor/shared/doctor.model';
import {FilterModel} from '../../shared/filter/filter.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

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
    if (filter && filter.searchField?.length > 0 && filter.searchText?.length > 0)
    {
      url = url
        + 'searchField=' + filter.searchText
        + '&searchText=' + filter.searchField + '&';
    }
    return this.http.get<FilteredListModel<Patient>>(url).pipe(
      catchError(err => {
        return of(this.filteredList);
      }));
  }

  addPatient(patient: Patient): Observable<Patient>
  {
    return this.http.post<Patient>(environment.webAPI_URL + 'Patients', patient).pipe(
      catchError(err => {
        this.patient.patientFirstName = err.message;
        return of(this.patient);
      }));
  }

  updatePatient(patient: Patient): Observable<Patient>
  {
    return this.http.put<Patient>(environment.webAPI_URL + 'Patients', patient).pipe(
      catchError(err => {
        this.patient.patientFirstName = err.message;
        return of(this.patient);
      }));
  }

  getPatientById(id: string): Observable<Patient>
  {
    return this.http.get<Patient>(environment.webAPI_URL + 'Patients/' + id).pipe(
      catchError(err => {
        this.patient.patientFirstName = err.message;
        return of(this.patient);
      }));
  }

  removePatient(id: string): Observable<Patient>
  {
    return this.http.delete<Patient>(environment.webAPI_URL + 'Patients/' + id).pipe(
      catchError(err => {
        this.patient.patientFirstName = err.message;
        return of(this.patient);
      }));
  }

}
