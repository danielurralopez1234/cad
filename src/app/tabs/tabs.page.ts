import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  admin: boolean;
  mecanico: boolean;
  cliente: boolean;

  constructor(private authService: AuthenticationService, private router: Router ) {
    this.authService.getSesionStorage().then((res) => {
      console.log('rol: ' + res.rol);
      if (res.rol === 1) {
        this.cliente = true;
      } else if (res.rol === 2) {
            this.router.navigate(['home-mecanico']);
            this.mecanico = true;
          } else if (res.rol === 3) {
            this.router.navigate(['home-administrador']);
            this.admin = true;
          }
    });
  }

  ngOnInit() {

  }


}
