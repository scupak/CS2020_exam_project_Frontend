import { Injectable } from '@angular/core';
import {Doctor} from './doctor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
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
export class DoctorService {
  doctorsApiUrl = environment.webAPI_URL + 'doctors';

  constructor(private http: HttpClient, private auth: AuthService) { }

  GetAll(): Observable<Doctor[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Doctor[]>(this.doctorsApiUrl, httpOptions);
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
