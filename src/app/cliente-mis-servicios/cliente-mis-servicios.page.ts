import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-mis-servicios',
  templateUrl: './cliente-mis-servicios.page.html',
  styleUrls: ['./cliente-mis-servicios.page.scss'],
})
export class ClienteMisServiciosPage implements OnInit {

  constructor(public alertController: AlertController) { }

  share(slidingItem: IonItemSliding) {
    slidingItem.close();
  }
  ondrag(item) {
    let percent = item.getSlidingPercent();
    if (percent > 0) {
      // positive
      console.log('right side');
    } else {
      // negative
      console.log('left side');
    }
    if (Math.abs(percent) > 1) {
      console.log('overscroll');
    }
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Evaluar Servicio',
      message: '<ion-icon name="star" style="zoom:2.0;color: yellow;border-color: black;"></ion-icon><ion-icon name="star" style="zoom:2.0;color: yellow;border-color: black;"></ion-icon><ion-icon name="star" style="zoom:2.0;color: yellow;border-color: black;"></ion-icon><ion-icon name="star" style="zoom:2.0;color: yellow;border-color: black;"></ion-icon><ion-icon name="star" style="zoom:2.0;color: yellow;border-color: black;"></ion-icon>',
      buttons: ['Aceptar',]
    });

    await alert.present();
  }
  delete(item){}
  ngOnInit() {
  }

}
