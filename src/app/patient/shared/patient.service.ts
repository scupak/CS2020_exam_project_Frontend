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

}
