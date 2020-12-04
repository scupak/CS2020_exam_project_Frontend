import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {Observable} from 'rxjs';
import {Patient} from '../shared/Patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;

  constructor(private patientservice: PatientService) { }

  ngOnInit(): void {

    this.patients$ = this.patientservice.getPatient();

  }

}
