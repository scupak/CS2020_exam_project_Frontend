import { Component, OnInit } from '@angular/core';
import {Patient} from '../shared/Patient';
import {HttpClient} from '@angular/common/http';
import {PatientService} from '../shared/patient.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patientsArray: Patient[] = [];
  patient$: Observable<Patient>;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.patient$ = this.patientService.getPatient();
  }
}
