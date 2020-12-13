import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../shared/doctor.model';
import {Observable, of} from 'rxjs';
import {DoctorService} from '../shared/doctor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.scss']
})
export class DoctorUpdateComponent implements OnInit {

  Id: string;
  UpdateForm: FormGroup;
  submitted = false;
  error: any;
  preiuosDoctor: Doctor;
  Doctor$: Observable<Doctor>;
  ErrorDoctor: Doctor = {
    firstName: 'Error',
    isAdmin: false,
    lastName: 'Error',
    phoneNumber: 'Error',
    doctorEmailAddress: 'Error'};

  constructor(private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {

    this.getDoctor();
    //  Initialize the form group
    this.UpdateForm = new FormGroup( {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('' , Validators.required),
      doctorEmailAddress: new FormControl('', Validators.required),
      isAdmin: new FormControl(false)
    });
  }
// Getters for easy access to form fields
  get firstName(): AbstractControl  { return this.UpdateForm.get('firstName'); }
  get lastName(): AbstractControl  { return this.UpdateForm.get('lastName'); }
  get phoneNumber(): AbstractControl  { return this.UpdateForm.get('phoneNumber'); }
  get emailAddress(): AbstractControl { return this.UpdateForm.get('doctorEmailAddress'); }
  get isAdmin(): AbstractControl{return this.UpdateForm.get('isAdmin'); }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateForm.invalid) {
      return;
    }



    const doctor = this.UpdateForm.value;

    doctor.doctorEmailAddress = this.preiuosDoctor.doctorEmailAddress;

    this.updateDoctor(doctor);
    // this.router.navigate(['']);

  }
  private updateDoctor(doctor: Doctor): void {
    this.doctorService.edit(doctor).pipe(take(1)).subscribe(
      success => {
          this.error = undefined;
          this.router.navigateByUrl('/doctor-detail/' + this.Id);
      },
      error => {
        this.error = error.error ?? error.message;
        return of(this.ErrorDoctor);
      }
    );

  }
  private getDoctor(): void {
    this.Doctor$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        this.Id = params.get('id');
        return this.doctorService.GetById(this.Id);
      }),
      tap(doctor => {
        this.preiuosDoctor = doctor;
        this.UpdateForm.patchValue(doctor);
      }), catchError(error => {
        this.error = error.error ?? error.message;
        return of(this.ErrorDoctor);
      }));

  }

}
