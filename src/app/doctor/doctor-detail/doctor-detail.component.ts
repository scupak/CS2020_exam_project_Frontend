import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import {Observable, of} from 'rxjs';
import {catchError, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
doctor$: Observable<Doctor>;
email: string;
  role = '';
  ErrorDoctor: Doctor = {
    firstName: 'Error',
    isAdmin: false,
    lastName: 'Error',
    phoneNumber: 'Error',
    doctorEmailAddress: 'Error'};
  error: any;
  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('id');
    this.getDoctorById();
    this.role = this.authService.getRole();
  }

  private getDoctorById(): void {
    this.doctor$ = this.doctorService.GetById(this.email).pipe(tap(this.error = undefined), catchError(error => {
      this.error = error.error ?? error.message;
      return of(this.ErrorDoctor);
    } ));
  }

  deleteDoctor(): void {
    this.doctorService.remove(this.email).pipe(take(1)).subscribe(() => {
      this.error = undefined;
      this.router.navigateByUrl('/doctor-list');
    }, error =>  {
      this.error = error.error ?? error.message;
      return of(this.ErrorDoctor);
    });
  }

}
