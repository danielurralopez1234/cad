import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   constructor(private router: Router) { }

  ngOnInit() {
  }

  login(form){
    switch(form.form.value.mail) {
      case "administrador@administrador.com":
        this.router.navigate(['/administrador-inicio']);
        break;
      case "cliente@cliente.com":
        this.router.navigate(['/cliente-inicio']);
        break;
        case "usuario@usuario.com":
        this.router.navigate(['/usuario-inicio']);
        break;
      default:
        this.router.navigate(['/crear-cuenta']);
    }
  }

}
