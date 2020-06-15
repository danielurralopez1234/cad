import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import {Router} from '@angular/router';
import {UsersService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  nombre: string;
  img: string;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    public menuCtrl: MenuController,
    private usersService: UsersService
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authState.subscribe(async state => {
        this.img = '';
        if (state) {
          await this.authenticationService.getSesionStorage().then(async (res) => {
            this.nombre = res.nombre.toUpperCase();
            if (res.foto !== undefined && res.foto.length > 0) {
              this.img = res.foto;
            } else {
              this.img = '../assets/shapes.svg';
            }
            await this.usersService.getUser(res.id).then(resp => {
              resp.subscribe(it => {
                if (it['foto'].length > 0) {
                  this.img = it['foto'];
                }
              });
            });
            if (res.rol === 2) {
              this.router.navigate(['app/tabs/notificaciones']);
            } else if (res.rol === 3) {
              this.router.navigate(['app/tabs/mantenedor']);
            } else if (res.rol === 1) {
              this.router.navigate(['app']);
            }
          });
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
    this.nombre = '';
    this.authenticationService.logout();
  }
}
