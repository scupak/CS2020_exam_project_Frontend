import { Component } from '@angular/core';

import {AuthService} from './shared/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lægehus booking system';
  parentItem = '';
  constructor( private authService: AuthService) { }

  onActivate(): void{

    this.parentItem = this.authService.getUsername();

  }
}
