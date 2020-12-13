import { Component } from '@angular/core';

import {AuthService} from './shared/authentication/auth.service';
import {PatientService} from './patient/shared/patient.service';
import {take} from 'rxjs/operators';
import {DoctorService} from './doctor/shared/doctor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lægehus booking system';
  FirstNameGet = '';
  errorMsg = '';
  userName = '';
  role = '';
  constructor( private authService: AuthService, private patientService: PatientService, private doctorService: DoctorService) { }

  onActivate(): void{
    this.role = this.authService.getRole();
    this.userName = this.authService.getUsername();
    if (this.role === 'Doctor' || this.role === 'Administrator')
    {
      this.getDoctorFirstNameById();
    }
    else if (this.role === 'Patient')
    {
      this.getPatientFirstNameById();
    }

  }
  getPatientFirstNameById(): void
  {
      this.patientService
      .getPatientById(this.userName).pipe(take(1))
      .subscribe(patient => {this.FirstNameGet = patient.patientFirstName; }, error => {this.errorMsg = error.message; });
  }

  getDoctorFirstNameById(): void
  {
    this.doctorService
      .GetById(this.userName).pipe(take(1))
      .subscribe(doctor => {this.FirstNameGet = doctor.firstName; }, error => {this.errorMsg = error.message; });
  }
}
