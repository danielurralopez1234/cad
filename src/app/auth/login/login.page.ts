import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  pass: string;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async onLogin() {
    await this.authService.onLogin(this.email, this.pass).then(async res => {
      if (res === null) {
        this.presentToast('Problemas al iniciar sesion');
      } else {
        this.presentToast('Sesion iniciada.');
      }
    }).catch(err => {
      if (err.code === 'auth/user-disabled') {
        this.presentToast('Cuenta desactivada.');
      } else {
        this.presentToast('Los datos son incorrectos o no existe usuario.');
      }
    });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
