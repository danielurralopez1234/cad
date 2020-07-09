import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Finaliza} from '../../../models/finaliza';
import {Router} from '@angular/router';

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
        this.data.nombre = item.nombre;
        this.data.idReserva = item.idReserva;
        this.data.mantencion = item.mantencion;
        this.data.fecha = item.fecha;
        this.data.direccion = item.direccion;
      });
    }
  }

  ngOnInit() {
  }

  async modalClose() {
    await this.modalController.dismiss(window.location.reload());
  }

}
