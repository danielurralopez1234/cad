import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-mecanico-inicio',
  templateUrl: './mecanico-inicio.page.html',
  styleUrls: ['./mecanico-inicio.page.scss'],
})
export class MecanicoInicioPage implements OnInit {

  constructor(public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Datos Cliente',
      message: '<ion-icon name="phone-portrait"></ion-icon>+569977885544<br><ion-icon name="mail"></ion-icon>mail@mail.com',
      buttons: ['Aceptar',]
    });

    await alert.present();
  }

  async alert0() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

  async alert1() {
    const alert = await this.alertController.create({
      header: 'Datos Automóvil',
      message: '<ion-icon name="car"></ion-icon>chevrolet sonic 1.6<br><ion-icon name="calendar"></ion-icon>Año 2015<br><ion-icon name="water"></ion-icon>Aceite 10w40',
      buttons: ['Aceptar',]
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.getTop();
}
}
