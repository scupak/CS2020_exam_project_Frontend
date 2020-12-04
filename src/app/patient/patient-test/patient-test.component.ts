import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';

@Component({
  selector: 'app-patient-test',
  templateUrl: './patient-test.component.html',
  styleUrls: ['./patient-test.component.scss']
})
export class PatientTestComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

}
