import {Component, OnDestroy, OnInit} from '@angular/core';
import {Patient} from '../shared/Patient';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../shared/patient.service';
import {of, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit, OnDestroy {

  patient: Patient;
  error: any;
  subscription: Subscription;
  ErrorPatient: Patient = {
    patientFirstName: 'Error',
    patientLastName: 'Error',
    patientPhone: 'Error',
    patientEmail: 'Error',
    patientCPR: 'Error'
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private patientService: PatientService) { }

  ngOnInit(): void
  {
    this.getPatientById();
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  getPatientById(): void
  {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.patientService
      .getPatientById(id)
      .subscribe(patient => {
        this.patient = patient;
        this.error = undefined;
        },
          error => {
        this.error = error.message ?? error.message;
        return of(this.ErrorPatient);
      });
  }

  deletePatient(): void {
      this.patientService.removePatient(this.patient.patientCPR).pipe(take(1)).subscribe( () => {

        this.router.navigateByUrl('/patient-list');
        this.error = undefined;
      }, error => {
        this.error = error ?? error.message;
        return of(this.ErrorPatient);
      });


  }
}
