import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {FormaPago} from '../../../../models/formaPago';
import {MantenedorService} from '../../../../services/mantenedor.service';

@Component({
  selector: 'app-addedit-forma-pago',
  templateUrl: './addedit-forma-pago.page.html',
  styleUrls: ['./addedit-forma-pago.page.scss'],
})
export class AddeditFormaPagoPage implements OnInit {
  formaPago: FormaPago = new FormaPago();

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController) { }

  ngOnInit() {
  }
  async modalClose() {
    await this.modalController.dismiss();
  }
  async saveFormaPago() {
    await this.mantService.saveFormaPago(this.formaPago).then(res => {
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
