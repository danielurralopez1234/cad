import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Finaliza} from '../../../models/finaliza';

@Component({
  selector: 'app-finalizacion',
  templateUrl: './finalizacion.page.html',
  styleUrls: ['./finalizacion.page.scss'],
})
export class FinalizacionPage implements OnInit {
  auxParam: any = [];
  data: Finaliza = new Finaliza();

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
    if (this.navParams.get('data')  !== null) {
      this.auxParam.push(this.navParams.get('data') as Finaliza);
      this.auxParam.forEach(item => {
        console.log(item);
        /*
        this.data.idReserva = item[0].idReserva;
        this.data.nombre = item[0].nombre;
        this.data.mantencion = item[0].mantencion;
        this.data.direccion = item[0].direccion;
        this.data.fecha = item[0].fecha;

         */
      });
    }
  }

  ngOnInit() {
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

}
