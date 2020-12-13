import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../shared/Patient';
import {Observable, of} from 'rxjs';
import {PatientService} from '../shared/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.scss']
})
export class PatientUpdateComponent implements OnInit {

  Id: string;
  UpdateForm: FormGroup;
  submitted = false;
  error: any;
  previousPatient: Patient;
  patient$: Observable<Patient>;
  ErrorPatient: Patient = {
    patientFirstName: 'Error',
    patientLastName: 'Error',
    patientPhone: 'Error',
    patientEmail: 'Error',
    patientCPR: 'Error'
  };

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {

    this.getPatient();
    //  Initialize the form group
    this.UpdateForm = new FormGroup( {
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientPhone: new FormControl('' , Validators.required),
      patientEmail: new FormControl('', Validators.required),
      password: new FormControl('' , Validators.required)
    });
  }
// Getters for easy access to form fields
  get patientFirstName(): AbstractControl  { return this.UpdateForm.get('patientFirstName'); }
  get patientLastName(): AbstractControl  { return this.UpdateForm.get('patientLastName'); }
  get patientPhone(): AbstractControl  { return this.UpdateForm.get('patientPhone'); }
  get patientEmail(): AbstractControl { return this.UpdateForm.get('patientEmail'); }
  get password(): AbstractControl { return this.UpdateForm.get('password'); }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateForm.invalid) {
      return;
    }



    const patient = this.UpdateForm.value;

    patient.patientCPR = this.previousPatient.patientCPR;

    this.updatePatient(patient);
    // this.router.navigate(['']);

  }
  private updatePatient(patient: Patient): void {
    this.patientService.updatePatient(patient).pipe(take(1)).subscribe(
      success => {
        this.error = undefined;
        this.router.navigateByUrl('/patient-detail/' + this.Id);
      },
      error => {
        this.error = error.error ?? error.message;
        return of(this.ErrorPatient);
      }
    );

  }
  private getPatient(): void {
    this.patient$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        this.Id = this.route.snapshot.paramMap.get('id');
        return this.patientService.getPatientById(this.Id);
      }),
      tap(patient => {
        this.previousPatient = patient;
        this.UpdateForm.patchValue(patient);
        this.error = undefined;
      })), catchError(error =>
    {
        this.error = error.error ?? error.message;
        return of(this.ErrorPatient);
    });

  }


}
