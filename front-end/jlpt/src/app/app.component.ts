import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jlpt';
  loginPanel = true;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  register() {
    this.loginPanel = false;
    this.router.navigate(['/register-panel']);
  }

  login() {
    this.loginPanel = true;
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.authService.role = '';
    this.loginPanel = true;
    this.router.navigate(['/']);
  }
}
