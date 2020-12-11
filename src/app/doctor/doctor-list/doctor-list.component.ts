import { Component, OnInit } from '@angular/core';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  doctorLists: Doctor[];
  err: any;

  doctors$: Observable<FilteredListModel<Doctor>>;
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }
  getAllDoctors(): void{
    this.doctors$ = this.doctorService.GetAll().pipe(
      tap(filterList => {
        this.doctorLists = filterList.list;
    }), catchError(this.err)
    );
  }

}
