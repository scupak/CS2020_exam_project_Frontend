import { Component, OnInit } from '@angular/core';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AuthService} from '../../shared/authentication/auth.service';
import {FilteredListModel} from '../../shared/filter/filteredListModel';
import {FilterModel} from '../../shared/filter/filter.model';
import {Appointment} from '../../appointment/shared/Appointment';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  role = '';
  doctorLists: Doctor[];
  error: any;
  count: number;
  doctors$: Observable<FilteredListModel<Doctor>>;
  submitted = false;
  loading = false;
  filter: FilterModel = {currentPage: 1, itemsPrPage: 10};
  filteredList: FilteredListModel<Doctor> = {
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
  constructor(private doctorService: DoctorService, private authService: AuthService) { }

  get searchText(): AbstractControl { return this.FilterForm.get('searchText'); }
  get searchField(): AbstractControl { return this.FilterForm.get('searchField'); }
  get orderProperty(): AbstractControl { return this.FilterForm.get('orderProperty'); }
  get orderDirection(): AbstractControl { return this.FilterForm.get('orderDirection'); }
  get itemsPrPage(): number { return (this.FilterForm.value as FilterModel).itemsPrPage; }
  get currentPage(): number { return (this.FilterForm.value as FilterModel).currentPage; }
  get maxPages(): number { return Math.ceil(this.count / this.itemsPrPage); }
  ngOnInit(): void {
    this.FilterForm.patchValue(this.filter);
    this.getAllDoctors();
    this.role = this.authService.getRole();
  }
  getAllDoctors(): void{
    this.doctors$ = this.doctorService.GetAll(this.filter).pipe(
      tap(filteredList => {
        this.error = undefined;
        this.count = filteredList.totalCount;
        this.doctorLists = filteredList.list;
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

    this.getAllDoctors();
  }

}
