import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async onLogin() {
    await this.authService.onLogin(this.user).then(async res => {
      this.presentToast('Sesion iniciada.');
    }).catch(err => this.presentToast('Los datos son incorrectos o no existe usuario.'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }



}
