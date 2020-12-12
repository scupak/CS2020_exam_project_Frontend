import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errormessage = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    //  Initialize the form group
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();
  }

  // Getters for easy access to form fields
  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.username.value, this.password.value)
      .subscribe(
        success => {
          this.router.navigate(['/home']);
        },
        error => {
          this.errormessage = error.message;
          this.loading = false;
        });
  }
}
