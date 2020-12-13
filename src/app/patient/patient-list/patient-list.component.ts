import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {Observable, of} from 'rxjs';
import {Patient} from '../shared/Patient';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<FilteredListModel<Patient>>;
  error: any;
  count: number;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Patient> = {
    totalCount: 0,
    list: [],
    filterUsed: this.filter};
  FilterForm = new FormGroup({
    itemsPrPage: new FormControl(''),
    currentPage: new FormControl(''),
    orderDirection: new FormControl(''),
    orderProperty: new FormControl(''),
    searchField: new FormControl(''),
    searchText: new FormControl('')
  });
  patientList: Patient[];
  submitted = false;
  role = '';

  constructor(private patientservice: PatientService,
              private authService: AuthService) { }

  get searchText(): AbstractControl { return this.FilterForm.get('searchText'); }
  get searchField(): AbstractControl { return this.FilterForm.get('searchField'); }
  get orderProperty(): AbstractControl { return this.FilterForm.get('orderProperty'); }
  get orderDirection(): AbstractControl { return this.FilterForm.get('orderDirection'); }
  get itemsPrPage(): number { return (this.FilterForm.value as FilterModel).itemsPrPage; }
  get currentPage(): number { return (this.FilterForm.value as FilterModel).currentPage; }
  get maxPages(): number { return Math.ceil(this.count / this.itemsPrPage); }

  ngOnInit(): void {
    this.FilterForm.patchValue(this.filter);
    this.getPatients();
    this.role = this.authService.getRole();

  }

  getPatients(): void
  {
    this.patients$ = this.patientservice.getPatients(this.filter).pipe(

      tap(filteredList => {
        this.error = undefined;
        this.count = filteredList.totalCount;
        this.patientList = filteredList.list;
      }), catchError(error => {
        this.error = error.error ?? error.message;
        return of(this.filteredList);
      }));
  }

  search(currentPage: number = 0): void{
    if (currentPage > 0) {
      this.FilterForm.patchValue({currentPage});
    }
    this.submitted = true;
    this.filter =
      { currentPage: this.currentPage,
        itemsPrPage: this.itemsPrPage,
        orderDirection: this.orderDirection.value,
        orderProperty: this.orderProperty.value,
        searchField: this.searchField.value,
        searchText: this.searchText.value
      };
    if (this.filter.currentPage <= 0){
      this.filter.currentPage = 1;
    }
    if (this.filter.itemsPrPage <= 0){
      this.filter.itemsPrPage = 1;
    }

    this.getPatients();
  }
}
