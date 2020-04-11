import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Auto} from '../../../../models/auto';
import {MantenedorService} from '../../../../services/mantenedor.service';

@Component({
  selector: 'app-addedit-auto',
  templateUrl: './addedit-auto.page.html',
  styleUrls: ['./addedit-auto.page.scss'],
})
export class AddeditAutoPage implements OnInit {
  auto: Auto = new Auto();

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController) { }

  ngOnInit() {}

  async modalClose() {
    await this.modalController.dismiss();
  }
  
  async saveAuto() {
    await this.mantService.saveAuto(this.auto).then(res => {
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
