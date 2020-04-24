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
  condicion = false;
  constructor(private router: Router, private authService: AuthenticationService, private toastController: ToastController,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    this.registroForm = formBuilder.group({
      rut: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.pattern('[0-9kK.-]*'), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      apellido: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      correo: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      clave: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmaClave: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      condicion: ['', Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
  }

  async register() {
    console.log(this.condicion);
    if (this.registroForm.valid) {
      if (this.confirmaPass === this.usuario.password) {
        if (this.condicion) {
          this.usuario.rut = this.clean(this.usuario.rut);
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
          this.presentAlert('Falta Aceptar términos y condiciones');
        }
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
    let rut = this.registroForm.get('rut').value;

    if (rut.length > 0) {
      rut = this.clean(rut)

      let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
      for (let i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result;
      }
      this.registroForm.controls['rut'].setValue(result);
    } else {
      this.registroForm.controls['rut'].setValue(rut);
    }

  }

  clean(rut) {
    return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : '';
  }


}
