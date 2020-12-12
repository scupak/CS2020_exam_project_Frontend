import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  User: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.User = 'Username: ' + this.authService.getUsername() + ' Role: ' + this.authService.getRole();
  }

}
