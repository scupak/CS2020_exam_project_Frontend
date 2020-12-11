import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {Observable, of} from 'rxjs';
import {Patient} from '../shared/Patient';
import {catchError, tap} from 'rxjs/operators';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<FilteredListModel<Patient>>;
  err: any;
  patientList: Patient[];
  constructor(private patientservice: PatientService) { }

  ngOnInit(): void {

    this.patients$ = this.patientservice.getPatients().pipe(

      tap(filterList => {
        this.patientList = filterList.list;
      } ),
      catchError(this.err)
    );

  }

}
