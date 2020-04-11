import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
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

  constructor(private modalController: ModalController, private mantService: MantenedorService) { this.shell = true; }

  ngOnInit() {
    const formaPagoRes = this.mantService.getAllformaPago();
    formaPagoRes.snapshotChanges().subscribe(res => {
      this.FormaPago = [];
      res.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.FormaPago.push(f as FormaPago);
      });
    });
  }
  activando() {
    console.log(this.shell);
  }
  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditFormaPagoPage
    });
    return await modal.present();
  }

}
