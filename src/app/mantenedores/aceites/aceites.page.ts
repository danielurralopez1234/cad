import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
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
              private toastController: ToastController) {  }

  ngOnInit() {
    const aceiteRes = this.mantService.getAllAceite();
    aceiteRes.snapshotChanges().subscribe(res => {
      this.Aceites = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Aceites.push(a as Aceite);
        this.auxAceites = this.Aceites;
      });
    });
  }

  async updateAceite(id: string, est: boolean) {
    await this.mantService.updateAceite(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }

  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditAceitePage
    });
    return await modal.present();
  }

  searchAceite(ev) {
    const val = ev.target.value;
    this.Aceites = this.auxAceites;
    if (val.trim() !== '') {
      this.Aceites = this.Aceites.filter((item) => {
        console.log(item);
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

}
