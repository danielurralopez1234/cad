import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  correo: string;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  recuperarClave() {
    this.authService.onRecovery(this.correo).then(res => {
      if (res === 'ok') {
        this.presentToast('Correo enviado exitosamente.');
        this.router.navigateByUrl('login');
      } else {
        this.presentToast('Problemas al intentar recuperar contraseña');
      }
    }).catch(err => this.presentToast('Problemas al intentar recuperar contraseña'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
