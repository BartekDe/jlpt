import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
    

  changeUsername()
  {
    /*alert('NAZWA UŻYTKOWNIKA ZOSTAŁA ZMIENIONA');*/
    alert('PODANA NAZWA UŻYTKOWNIKA JEST ZAJĘTA');
  }

  changePassword()
  {
    alert('HASŁO UŻYTKOWNIKA ZOSTAŁO ZMIENIONE');
  }

  deleteAccount()
  {
    alert('KONTO ZOSTAŁO USUNIĘTE');
  }

}
