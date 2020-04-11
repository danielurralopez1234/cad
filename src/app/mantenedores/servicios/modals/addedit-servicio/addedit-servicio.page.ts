import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Servicio} from '../../../../models/servicio';
import {MantenedorService} from '../../../../services/mantenedor.service';

@Component({
  selector: 'app-addedit-servicio',
  templateUrl: './addedit-servicio.page.html',
  styleUrls: ['./addedit-servicio.page.scss'],
})
export class AddeditServicioPage implements OnInit {
  servicio: Servicio = new Servicio();

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController) { }

  ngOnInit() {}

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveServicio() {
    await this.mantService.saveServicio(this.servicio).then(res => {
    this.presentToast('Registro exitoso.');
    this.modalClose();
    }).catch(err => this.presentToast('Error al guardar registro'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
