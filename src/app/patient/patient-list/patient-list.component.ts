import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {Observable, of} from 'rxjs';
import {Patient} from '../shared/Patient';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;
  err: string;
  role = '';
  constructor(private patientservice: PatientService , private authService: AuthService) { }

  ngOnInit(): void {

    this.role = this.authService.getRole();
    this.patients$ = this.patientservice.getPatients().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        return of([]);
      })
    );

  }

}
