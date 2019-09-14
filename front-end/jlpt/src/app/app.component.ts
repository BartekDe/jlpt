import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jlpt';

  logout(){
    //localStorage.removeItem("accessToken");
    this.authService.role = '';
  }

  constructor(private authService: AuthService){
  }
}
