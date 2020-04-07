import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-finalizacion',
  templateUrl: './finalizacion.page.html',
  styleUrls: ['./finalizacion.page.scss'],
})
export class FinalizacionPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

}
