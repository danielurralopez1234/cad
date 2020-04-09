import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Aceite} from '../../../../models/aceite';
import {MantenedorService} from '../../../../services/mantenedor.service';

@Component({
  selector: 'app-addedit-aceite',
  templateUrl: './addedit-aceite.page.html',
  styleUrls: ['./addedit-aceite.page.scss'],
})
export class AddeditAceitePage implements OnInit {
  aceite: Aceite = new Aceite();

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveAceite() {
    await this.mantService.saveAceite(this.aceite).then(res => {
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
