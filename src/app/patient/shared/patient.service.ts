import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from './Patient';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatient(): Observable<Patient[]>
  {
    return this.http.get<Patient[]>(environment.webAPI_URL + 'Patients');
  }

  addPatient(patient: Patient): Observable<Patient>
  {
    return this.http.post<Patient>(environment.webAPI_URL + 'Patients', patient);
  }

  updatePatient(patient: Patient): Observable<Patient>
  {
    return this.http.put<Patient>(environment.webAPI_URL + 'Patients', patient);
  }

  getPatientById(id: string): Observable<Patient>
  {
    return this.http.get<Patient>(environment.webAPI_URL + 'Patients/' + id);
  }

  removePatient(id: string): Observable<Patient>
  {
    return this.http.delete<Patient>(environment.webAPI_URL + 'Patients/' + id);
  }

}
