import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from './Patient';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
export class PatientService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPatients(): Observable<Patient[]>
  {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Patient[]>(environment.webAPI_URL + 'Patients', httpOptions);
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
