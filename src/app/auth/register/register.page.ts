import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Usuario} from '../../models/usuario';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: Usuario = new Usuario();
  confirmaPass: string;
  registroForm: FormGroup;
  constructor(private router: Router, private authService: AuthenticationService, private toastController: ToastController,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    this.registroForm = formBuilder.group({
      rut: ['', Validators.compose([Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9-]*'), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      apellido: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      correo: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/), Validators.required])],
      telefono: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      clave: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmaClave: ['', Validators.compose([Validators.minLength(6), Validators.required])],

    });
  }

  ngOnInit() {
  }

  async register() {
    if (this.registroForm.valid) {
      if (this.confirmaPass === this.usuario.password) {
        await this.authService.onRegister(this.usuario).then(res => {
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
      } else {
        this.presentAlert('Contraseña no coincide.');
      }
    } else {
      this.presentAlert('Faltan campos que llenar.');
    }
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Formulario',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  formatRut() {
    let rut = this.usuario.rut;
    let last = rut.substring(rut.length - 1, rut.length);
    let prelast = rut.substring(0, rut.length - 1);
    if (prelast.length > 0) {
      rut = prelast + '-' + last;
    }

    this.usuario.rut = rut;
    /*
    for (let i = 0; i < rut.length; i++) {
      console.log(rut.substring(i, i + 1));
      console.log('for ' + i);
      if (rut.length === i - 1) {
        a = a + '-';
      }
      a = a + rut.substring(i, i + 1);
    }

     */
    //
  }

}
