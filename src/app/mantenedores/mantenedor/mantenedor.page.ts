import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usermantenedor } from 'src/app/models/usermantenedor';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {
  user: Usermantenedor = new Usermantenedor();

  id: string;

  mecanico: boolean;
  aceite: boolean;
  automovil: boolean;
  tiposervicio: boolean;
  formapago: boolean;

  constructor(private router: ActivatedRoute, private authService: AuthenticationService, private toastController: ToastController) {
    this.id = this.router.snapshot.paramMap.get('id');

    switch (this.id) {
      case '1':
        this.mecanico = true;
        break;
      case '2':
        this.aceite = true;
        break;
      case '3':
        this.automovil = true;
        break;
      case '4':
        this.tiposervicio = true;
        break;
      case '5':
        this.formapago = true;
        break;
      default:
    }

   }
   
   async registerMecanico() {
     debugger
    await this.authService.onRegisterUsuarioMantenedor(this.user).then(res => {
      this.presentToast('Registro exitoso.');
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


  ngOnInit() {}

}
