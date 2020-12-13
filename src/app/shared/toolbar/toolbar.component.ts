import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  @Input() childItem: string;
  User: string;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {

    //this.User$ = this.authService.getUsernameObservable();

  }


  GetUser(): void {
    this.User = 'Username: ' + this.authService.getUsername() + ' Role: ' + this.authService.getRole();

  }

}
