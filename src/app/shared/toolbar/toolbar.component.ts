import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Observable, of} from 'rxjs';
import {AppointmentService} from '../../appointment/shared/appointment.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  @Input() UserName: string;
  User: string;
  @Input() role: string;
  @Input() firstName: string;
  changetracket
  error: any;

  constructor( private authService: AuthService , private appointmentService: AppointmentService) { }

  ngOnInit(): void {



  }

  ActivateGenerator(): void {
    this.appointmentService.activateGenerator()
      .pipe(take(1)).subscribe( message => {
      this.error = message;

    }, error => {
      this.error = error.error ?? error.message;
      return of(error.message);
    });

  }

  StopGenerator(): void {
    this.appointmentService.stopGenerator()
      .pipe(take(1)).subscribe( message => {
      this.error = message;

    }, error => {
      this.error = error.error ?? error.message;
      return of(error.message);
    });

  }


  GetUser(): void {
    this.User = 'Username: ' + this.authService.getUsername() + ' Role: ' + this.authService.getRole();


  }

}
