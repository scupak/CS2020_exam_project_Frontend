import { Component, OnInit } from '@angular/core';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  role = '';
  doctors$: Observable<Doctor[]>;
  constructor(private doctorService: DoctorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.role = this.authService.getRole();
  }
  getAllDoctors(): void{
    this.doctors$ = this.doctorService.GetAll();
  }

}
