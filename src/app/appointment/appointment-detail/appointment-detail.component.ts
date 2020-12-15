import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AppointmentService} from '../shared/appointment.service';
import {Appointment} from '../shared/Appointment';
import {AuthService} from '../../shared/authentication/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {

  appointment: Appointment;
  error: any;
  subscription: Subscription;
  id: number;
  role = '';
  return: string;
  errorAppointment: Appointment = {appointmentDateTime: new Date(),
    appointmentId: 1,
    description: 'Error',
    doctorEmailAddress: 'Error',
    durationInMin: 15,
    patientCpr: '',
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appointmentService: AppointmentService,
              private authService: AuthService,
              private location: Location) { }

  ngOnInit(): void
  {
    this.getAppointmentById();
    this.role = this.authService.getRole();
    this.return = this.route.snapshot.paramMap.get('return');
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  getAppointmentById(): void
  {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.appointmentService
      .getAppointmentById(this.id).subscribe(
        appointment => {
          this.error = undefined;
          this.appointment = appointment;
      },
          error => {
          this.error = error.error ?? error.message;
          return of(this.errorAppointment);
          }
          );
  }

  deleteAppointment(): void {
    this.appointmentService.removeAppointment(this.appointment.appointmentId)
      .pipe(take(1)).subscribe( () => {
      this.error = undefined;
      this.location.back();
    }, error => {
        this.error = error.error ?? error.message;
        return of(this.appointment);
    });


  }

  cancelAppointment(): void {
    this.appointment.patientCpr = null;
    this.appointment.patient = null;
    this.appointmentService.updateAppointment(this.appointment).pipe(take(1)).subscribe(
      success => {
        this.error = undefined;
        this.location.back();
      } ,
      error => {
        this.error = error.error ?? error.message;
        return of(this.appointment);
      }
    );

  }
}
