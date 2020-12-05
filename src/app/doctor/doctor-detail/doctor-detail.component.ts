import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
product$: Observable<Doctor>;
  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctorById();
  }

  private getDoctorById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.product$ = this.doctorService.GetById(id);
  }
}
