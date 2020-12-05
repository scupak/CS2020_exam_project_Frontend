import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
import {catchError, map, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
doctor$: Observable<Doctor>;
id: number;
  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDoctorById();
  }

  private getDoctorById(): void {
    this.doctor$ = this.doctorService.GetById(this.id);
  }

  deleteDoctor(): void {
    this.doctorService.remove(this.id).pipe(take(1)).subscribe(() => {
      this.router.navigateByUrl('/doctor-list');
    });
  }
}
