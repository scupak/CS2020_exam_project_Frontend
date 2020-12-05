import { Component, OnInit } from '@angular/core';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  doctors$: Observable<Doctor[]>;
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }
  getAllDoctors(): void{
    this.doctors$ = this.doctorService.GetAll();
  }

}
