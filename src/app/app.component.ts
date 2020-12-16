import { Component } from '@angular/core';

import {AuthService} from './shared/authentication/auth.service';
import {PatientService} from './patient/shared/patient.service';
import {take} from 'rxjs/operators';
import {DoctorService} from './doctor/shared/doctor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginScreenComponent} from './login/login-screen/login-screen.component';

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
  constructor( private authService: AuthService,
               private patientService: PatientService,
               private doctorService: DoctorService,
               private router: Router ,
               private activatedRoute: ActivatedRoute) { }

  onActivate(): void {
    console.log(this.getActivatedRoute().component);

    let snapshot = this.activatedRoute.snapshot;
    // console.log(snapshot.routeConfig.component.name);


    console.log(this.router.url + '  URL');

    if (this.router.url === '/login') {
      console.log('its the login screen');

      this.FirstNameGet = '';
      this.userName = '';
      this.role = '';


    } else
    {
      this.role = this.authService.getRole();
      this.userName = this.authService.getUsername();
      if (this.role === 'Doctor' || this.role === 'Administrator') {
      this.getDoctorFirstNameById();
    } else if (this.role === 'Patient') {
      this.getPatientFirstNameById();
    }
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

  private getActivatedRoute(): ActivatedRoute {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
