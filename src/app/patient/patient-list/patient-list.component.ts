import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {Observable, of} from 'rxjs';
import {Patient} from '../shared/Patient';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;
  err: string;
  constructor(private patientservice: PatientService) { }

  ngOnInit(): void {

    this.patients$ = this.patientservice.getPatient().pipe(

      tap(() => this.err = undefined ),
      catchError(err => {
        this.err = err.message;
        return of([]);
      })
    );

  }

}
