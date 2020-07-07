import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AddeditAceitePage} from './modals/addedit-aceite/addedit-aceite.page';
import {MantenedorService} from '../../services/mantenedor.service';
import {Aceite} from '../../models/aceite';

@Component({
  selector: 'app-aceites',
  templateUrl: './aceites.page.html',
  styleUrls: ['./aceites.page.scss'],
})
export class AceitesPage implements OnInit {
  Aceites: any;
  auxAceites: any;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private alertController: AlertController) {
  }

  async ngOnInit() {
    await this.mantService.getAllAceite().snapshotChanges().subscribe(res => {
      this.Aceites = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.mantService.getAllTipoMantencion().snapshotChanges().subscribe(sus => {
          sus.forEach(it => {
            const x = it.payload.toJSON();
            if (a['idKm'] === it.key) {
              a['nomKm'] = x['nombre'];
            }
          });
        });
        this.Aceites.push(a as Aceite);
        this.auxAceites = this.Aceites;
      });
    });
  }

  async updateAceite(id: string, est: boolean) {
    est = !est;
    await this.mantService.updateAceite(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));

  }

  searchAceite(ev) {
    const val = ev.target.value;
    this.Aceites = this.auxAceites;
    if (val.trim() !== '' && this.Aceites !== undefined) {
      this.Aceites = this.Aceites.filter((item) => {
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
      params = this.Aceites.filter((item) => {
        return (item.$key.toLowerCase() === id.toString().toLocaleLowerCase());
      });
    }
    const modal = await this.modalController.create({
      component: AddeditAceitePage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();

  }

  async deleteAceite(id: string) {
    await this.mantService.deleteAceite(id).then(res => {
      this.presentToast('Eliminado.');
      this.mantService.removeImage(id);
      this.Aceites = [];
    }).catch(err => this.presentToast('Problemas al eliminar registro.'));
  }

  async deleteAlertConfirm(key: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar aceite<strong> ' + nombre + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteAceite(key);
          }
        }
      ]
    });

    await alert.present();
  }

}
