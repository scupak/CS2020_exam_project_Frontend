import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-patient-creator',
  templateUrl: './patient-creator.component.html',
  styleUrls: ['./patient-creator.component.scss']
})
export class PatientCreatorComponent implements OnInit {
  patientForm = new FormGroup( {
    patientFirstName: new FormControl('', Validators.required),
    patientLastName: new FormControl('', Validators.required),
    patientPhone: new FormControl('' , Validators.required),
    patientEmail: new FormControl('', Validators.required),
    patientCPR: new FormControl('' , Validators.required)
  });
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private patientService: PatientService) { }



  // Getters for easy access to form fields
  get patientFirstName(): AbstractControl { return this.patientForm.get('patientFirstName'); }
  get patientLastName(): AbstractControl { return this.patientForm.get('patientLastName'); }
  get patientPhone(): AbstractControl { return this.patientForm.get('patientPhone'); }
  get patientEmail(): AbstractControl { return this.patientForm.get('patientEmail'); }
  get patientCPR(): AbstractControl { return this.patientForm.get('patientCPR'); }


  ngOnInit(): void {
  }

  save(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.patientForm.invalid) {
      return;
    }
    const patient = this.patientForm.value;

    this.loading = true;
    this.patientService.addPatient(patient).pipe(take(1)).subscribe(
      succes => {
        this.loading = false;
        this.errormessage = 'Success';
      } ,
      error => {
        this.errormessage = error.message;
        this.loading = false;
      }
    );
    }
  }


