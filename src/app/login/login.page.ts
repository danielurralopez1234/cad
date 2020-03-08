import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(form) {
    switch (form.form.value.mail) {
      //case 'administrador@administrador.com':
      case 'administrador':
        this.router.navigate(['/administrador-inicio']);
        break;
      //case 'cliente@cliente.com':
      case 'cliente':
        this.router.navigate(['/cliente-inicio']);
        break;
      //case 'usuario@usuario.com:
      case 'usuario':
        this.router.navigate(['/usuario-inicio']);
        break;
      default:
        this.router.navigate(['/crear-cuenta']);
    }
  }

}
