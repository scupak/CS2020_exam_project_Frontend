import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../shared/doctor.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {pipe} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent implements OnInit {

  doctorForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    isAdmin: new FormControl('')
  });
  constructor(private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit(): void {
  }

  save(): void{
    const doctor = this.doctorForm.value;
    this.doctorService.create(doctor).pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/doctor-list'));
  }
}
