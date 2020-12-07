import {Component, OnDestroy, OnInit} from '@angular/core';
import {Patient} from '../shared/Patient';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../shared/patient.service';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit, OnDestroy {

  patient: Patient;
  errorMsg: '';
  subscription: Subscription;

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
      .subscribe(patient => {this.patient = patient; }, error => {this.errorMsg = error.message; });
  }

  deletePatient(): void {
      this.patientService.removePatient(this.patient.patientCPR).pipe(take(1)).subscribe( () => {

        this.router.navigateByUrl('/patient-list');
      });


  }
}
