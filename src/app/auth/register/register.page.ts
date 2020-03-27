import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  constructor(private router: Router, private authService: AuthenticationService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async register() {
    await this.authService.onRegister(this.user).then(res => {
      this.presentToast('Registro exitoso.');
      this.router.navigate(['/login']);
    }).catch(err => {
      let msg = '';
      if (err.code === 'auth/weak-password') {
        msg = 'Error, Clave minima de 6 caracteres.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'Error, Cuenta registrada por otro usuario.';
      } else {
        msg = 'Error al crear usuario.';
      }
      this.presentToast(msg);
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
