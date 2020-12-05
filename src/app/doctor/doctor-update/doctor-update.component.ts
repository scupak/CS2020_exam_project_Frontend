import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../shared/doctor.model';
import {Observable} from 'rxjs';
import {DoctorService} from '../shared/doctor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.scss']
})
export class DoctorUpdateComponent implements OnInit {

  UpdateForm: FormGroup;
  submitted = false;
  errormessage = '';
  preiuosDoctor: Doctor;
  Doctor$: Observable<Doctor>;

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
      emailAddress: new FormControl('', Validators.required),
      isAdmin: new FormControl('')
    });
  }
// Getters for easy access to form fields
  get firstName(): AbstractControl  { return this.UpdateForm.get('firstName'); }
  get lastName(): AbstractControl  { return this.UpdateForm.get('lastName'); }
  get phoneNumber(): AbstractControl  { return this.UpdateForm.get('phoneNumber'); }
  get emailAddress(): AbstractControl { return this.UpdateForm.get('emailAddress'); }
  get isAdmin(): AbstractControl{return this.UpdateForm.get('isAdmin'); }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateForm.invalid) {
      return;
    }



    const doctor = this.UpdateForm.value;

    doctor.doctorId = this.preiuosDoctor.doctorId;

    this.updateDoctor(doctor);
    // this.router.navigate(['']);

  }
  private updateDoctor(doctor: Doctor): void {
    this.doctorService.edit(doctor).pipe(take(1)).subscribe(
      success => {
        this.router.navigateByUrl('/doctor-list');
      },
      error => {
        this.errormessage = error.message;
      }
    );

  }
  private getDoctor(): void {
    this.Doctor$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        const id = +params.get('id');
        return this.doctorService.GetById(id);
      }),
      tap(doctor => {
        this.preiuosDoctor = doctor;
        this.UpdateForm.patchValue(doctor);
      }));

  }

}
