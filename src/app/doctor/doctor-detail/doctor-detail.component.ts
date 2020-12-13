import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
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
    this.doctor$ = this.doctorService.GetById(this.email);
  }

  deleteDoctor(): void {
    this.doctorService.remove(this.email).pipe(take(1)).subscribe(() => {
      this.router.navigateByUrl('/doctor-list');
    });
  }

}
