import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../shared/Patient';
import {Observable} from 'rxjs';
import {PatientService} from '../shared/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.scss']
})
export class PatientUpdateComponent implements OnInit {

  UpdateForm: FormGroup;
  submitted = false;
  errormessage = '';
  previousPatient: Patient;
  patient$: Observable<Patient>;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    this.getProduct();
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
        this.errormessage = 'Success!';
      },
      error => {
        this.errormessage = error.message;
      }
    );

  }
  private getProduct(): void {
    this.patient$ = this.route.paramMap.pipe(take(1),
      switchMap(params => {
        const id = this.route.snapshot.paramMap.get('id');
        return this.patientService.getPatientById(id);
      }),
      tap(patient => {
        this.previousPatient = patient;
        this.UpdateForm.patchValue(patient);
      }));

  }


}
