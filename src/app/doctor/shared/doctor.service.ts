import { Injectable } from '@angular/core';
import {Doctor} from './doctor.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorsApiUrl = environment.webAPI_URL + 'doctors';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorsApiUrl);
  }

  GetById(id: number): Observable<Doctor>{
    return this.http.get<Doctor>(this.doctorsApiUrl + '/' + id);
  }

  create(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(this.doctorsApiUrl, doctor);
  }

  edit(doctor: Doctor): Observable<Doctor>{
    return this.http.put<Doctor>(this.doctorsApiUrl, doctor);
  }

  remove(id: number): Observable<Doctor>{
    return this.http.delete<Doctor>(this.doctorsApiUrl + '/' + id);
  }
}
