import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  username: string = '';
  password: string = '';
  isLoading = false;
  error: string
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.error = "";
    this.authService.login(this.username, this.password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
