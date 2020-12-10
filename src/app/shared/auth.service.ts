import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const helper = new JwtHelperService();
    return this.http.post<any>(environment.webAPI_URL + '/token', { username, password })
      .pipe(map(response => {
        const token = response.token;
        // login successful if there's a jwt token in the response
        if (token) {
          const decodedToken = helper.decodeToken(token);
          console.log(decodedToken);



          console.log(JSON.stringify(decodedToken).split('"')[7]);

          const JwtData = token.split('.')[1];
          const decodedJwtJsonData = window.atob(JwtData);
          const decodedJwtData = JSON.parse(decodedJwtJsonData);

          console.log(decodedJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

          const rolearray = decodedJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          rolearray.forEach(role => console.log(role));

          console.log(decodedToken);



          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username, token, DecodeToken: decodedToken  }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }));
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.token;
    } else {
      return null;
    }
  }

  getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.username;
    } else {
      return null;
    }
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
