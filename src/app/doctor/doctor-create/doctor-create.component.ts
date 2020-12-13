import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../shared/doctor.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {of, pipe} from 'rxjs';
import { take } from 'rxjs/operators';
import {Doctor} from '../shared/doctor.model';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent implements OnInit {

  doctorForm: FormGroup;
  submitted = false;
  loading = false;
  error: any;
  ErrorDoctor: Doctor = {
    firstName: 'Error',
    isAdmin: false,
    lastName: 'Error',
    phoneNumber: 'Error',
    doctorEmailAddress: 'Error'};
  constructor(private doctorService: DoctorService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form group
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      doctorEmailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      isAdmin: [false]
    });
  }
  // Getters for easy access to form fields
  get firstName(): AbstractControl { return this.doctorForm.get('firstName'); }
  get lastName(): AbstractControl { return this.doctorForm.get('lastName'); }
  get emailAddress(): AbstractControl { return this.doctorForm.get('doctorEmailAddress'); }
  get phoneNumber(): AbstractControl { return this.doctorForm.get('phoneNumber'); }
  get isAdmin(): AbstractControl { return this.doctorForm.get('isAdmin'); }

  onSubmit(): void {
    this.submitted = true;
    // stop here if for is invalid
    if (this.doctorForm.invalid){
      return;
    }
    this.loading = true;
    const doctor = this.doctorForm.value;
    this.doctorService.create(doctor)
      .pipe(take(1))
      .subscribe(
        success => {
          this.error = undefined;
          this.router.navigateByUrl('/doctor-list');
        },
        error => {
          this.error = error.error ?? error.message;
          this.loading = false;
          return of(this.ErrorDoctor);
        });
  }

}
