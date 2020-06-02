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

  constructor(private authService: AuthenticationService) {  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(resp => {
      if (resp !== null) {
        if (resp.rol === 2) {
          this.mecanico = true;
          this.admin = false;
        } else if (resp.rol === 3) {
          this.admin = true;
          this.mecanico = false;
        } else {
          this.admin = false;
          this.mecanico = false;
        }
      } else {
        this.authService.getSesionStorage().then((res) => {
          console.log('rol: ' + res.rol);
          if (res.rol === 2) {
            this.mecanico = true;
          } else if (res.rol === 3) {
            this.admin = true;
          }
        });
      }
    });
  }


}
