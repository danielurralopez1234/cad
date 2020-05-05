import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  nombre: string;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.authenticationService.getSesionStorage().then((res) => {
            console.log('nombre: ' + res.nombre);
            this.nombre = res.nombre.toUpperCase();
          });
          this.router.navigate(['app']);
        } else {
          this.router.navigate(['bienvenida']);
        }
      });

    });
  }

  sideMenu() {
    this.navigate =
        [
          {
            title : 'Mi Perfil',
            url   : '/perfil',
            icon  : 'person-circle-outline'
          },
          {
            title : 'Mis Autos',
            url   : '/misautos',
            icon  : 'car'
          },
          {
            title : 'Terminos y Condiciones',
            url   : '/terminos-y-condiciones',
            icon  : 'information-circle-outline'
          },
          {
            title : 'Contacto y Soporte',
            url   : '/contacto',
            icon  : 'call-outline'
          }
        ];
  }

  logoutUser() {
    this.menuCtrl.close();
    this.authenticationService.logout();
  }
}
