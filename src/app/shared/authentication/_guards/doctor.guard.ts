import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): boolean
  {
    if (this.authService.getRole() === 'Doctor' || this.authService.getRole() === 'Administrator')
    {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
