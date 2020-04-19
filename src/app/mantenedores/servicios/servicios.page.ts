import { Component, OnInit } from '@angular/core';
import {AddeditServicioPage} from './modals/addedit-servicio/addedit-servicio.page';
import {MantenedorService} from '../../services/mantenedor.service';
import { Servicio } from '../../models/servicio';
import {AlertController, ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  shell: boolean;
  Servicio: any;
  auxServicio: any;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private alertController: AlertController) { }

  ngOnInit() {
    const servicioRes = this.mantService.getAllservicio();
    servicioRes.snapshotChanges().subscribe(res => {
      this.Servicio = [];
      res.forEach(item => {
        const s = item.payload.toJSON();
        s['$key'] = item.key;
        this.Servicio.push(s as Servicio);
        this.auxServicio = this.Servicio;
      });
    });
  }
  async updateServicio(id: string, est: boolean) {
    console.log('update');
    await this.mantService.updateServicio(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }

  searchServicio(ev) {
    const val = ev.target.value;
    this.Servicio = this.auxServicio;
    if (val.trim() !== '') {
      this.Servicio = this.Servicio.filter((item) => {
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
      params = this.Servicio.filter((item) => {
        return (item.$key.toLowerCase() === id.toString().toLocaleLowerCase());
      });
    }
    const modal = await this.modalController.create({
      component: AddeditServicioPage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();

  }

  async deleteServicio(id: string) {
    await this.mantService.deleteServicio(id).then(res => {
      this.presentToast('Eliminado.');
    }).catch(err => this.presentToast('Problemas al eliminar registro.'));
  }

  async deleteAlertConfirm(key: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar servicio<strong> ' + nombre + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteServicio(key);
          }
        }
      ]
    });

    await alert.present();
  }


}
