import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AddeditFormaPagoPage} from './modals/addedit-forma-pago/addedit-forma-pago.page';
import {MantenedorService} from '../../services/mantenedor.service';
import { FormaPago } from '../../models/formaPago';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.page.html',
  styleUrls: ['./forma-pago.page.scss'],
})
export class FormaPagoPage implements OnInit {
  shell: boolean;
  FormaPago: any;
  auxFormaPago: any;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private alertController: AlertController) { }

  ngOnInit() {
    const formaPagoRes = this.mantService.getAllformaPago();
    formaPagoRes.snapshotChanges().subscribe(res => {
      this.FormaPago = [];
      res.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.FormaPago.push(f as FormaPago);
        this.auxFormaPago = this.FormaPago;
      });
    });
  }
  async updateFormaPago(id: string, est: boolean) {
    est = !est;
    await this.mantService.updateFormaPago(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }
  searchFormaPago(ev) {
    const val = ev.target.value;
    this.FormaPago = this.auxFormaPago;
    if (val.trim() !== '') {
      this.FormaPago = this.FormaPago.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      });
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  async addeditModal(id: string) {
    let params;
    if (id === null) {
      params = id;
    } else {
      params = this.FormaPago.filter((item) => {
        return (item.$key.toLowerCase() === id.toString().toLocaleLowerCase());
      });
    }
    const modal = await this.modalController.create({
      component: AddeditFormaPagoPage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();
  }
  async deleteFormaPago(id: string) {
    await this.mantService.deleteFormaPago(id).then(res => {
      this.presentToast('Eliminado.');
    }).catch(err => this.presentToast('Problemas al eliminar registro.'));
  }
  async deleteAlertConfirm(key: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar forma de pago<strong> ' + nombre + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteFormaPago(key);
          }
        }
      ]
    });

    await alert.present();
  }
}
