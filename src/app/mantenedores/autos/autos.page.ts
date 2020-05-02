import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AddeditAutoPage} from './modals/addedit-auto/addedit-auto.page';
import {MantenedorService} from '../../services/mantenedor.service';
import {Marca} from '../../models/marca';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  shell: boolean;
  Auto: any;
  auxAutos: any;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private alertController: AlertController) {}

  ngOnInit() {
    const autoeRes = this.mantService.getAllMarca();
    autoeRes.snapshotChanges().subscribe(res => {
      this.Auto = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Auto.push(a as Marca);
        this.auxAutos = this.Auto;
      });
    });
  }

  async updateAuto(id: string, est: boolean) {
    est = !est;
    await this.mantService.updateAuto(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }
  searchAuto(ev) {
    const val = ev.target.value;
    this.Auto = this.auxAutos;
    if (val.trim() !== '') {
      this.Auto = this.auxAutos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      });
    }
  }

  async addeditModal(id: string) {
    let params;
    if (id === null) {
      params = id;
    } else {
      params = this.Auto.filter((item) => {
        return (item.$key.toLowerCase() === id.toString().toLocaleLowerCase());
      });
    }
    const modal = await this.modalController.create({
      component: AddeditAutoPage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();
  }
  async deleteAuto(id: string) {
    await this.mantService.deleteAuto(id).then(res => {
      this.presentToast('Eliminado.');
    }).catch(err => this.presentToast('Problemas al eliminar registro.'));
  }
  async deleteAlertConfirm(key: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar auto<strong> ' + nombre + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteAuto(key);
          }
        }
      ]
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

}
