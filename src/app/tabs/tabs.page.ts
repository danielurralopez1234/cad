import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  admin: boolean;
  mecanico: boolean;
  cliente: boolean;

  constructor(private authService: AuthenticationService) {  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(resp => {
      if (resp !== null) {
        if (resp.rol === 2) {
          this.mecanico = true;
          this.admin = false;
          this.cliente = false;
        } else if (resp.rol === 3) {
          this.admin = true;
          this.mecanico = false;
          this.cliente = false;
        } else if (resp.rol === 1) {
          this.cliente = true;
          this.mecanico = false;
          this.admin = false;
        } else {
          this.admin = false;
          this.mecanico = false;
          this.cliente = false;
        }
      } else {
        this.authService.getSesionStorage().then((res) => {
          if (res.rol === 2) {
            this.mecanico = true;
          } else if (res.rol === 3) {
            this.admin = true;
          } else if (res.rol === 1) {
            this.cliente = true;
          }
        });
      }
    });
  }


}
