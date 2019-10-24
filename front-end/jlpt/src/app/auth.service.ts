import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {RegisterModel} from './models/RegisterModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role = '';
  // role =  'Admin';
  constructor(private route: Router,
              private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  public saveToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.route.navigate(['/profil']);
  }

  registerUser(registerM: RegisterModel) {
    this.route.navigate(['/']);
    return this.httpClient.post('http://localhost:8080/auth/register', registerM);
  }
}
