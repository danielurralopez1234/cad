import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddeditAceitePage} from './modals/addedit-aceite/addedit-aceite.page';
import {MantenedorService} from '../../services/mantenedor.service';
import {Aceite} from '../../models/aceite';

@Component({
  selector: 'app-aceites',
  templateUrl: './aceites.page.html',
  styleUrls: ['./aceites.page.scss'],
})
export class AceitesPage implements OnInit {
  shell: boolean;
  Aceites: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService) {
    this.shell = true;
  }

  ngOnInit() {
    const aceiteRes = this.mantService.getAllAceite();
    aceiteRes.snapshotChanges().subscribe(res => {
      this.Aceites = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Aceites.push(a as Aceite);
      });
    });
  }

  activando() {
    console.log(this.shell);
  }

  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditAceitePage
    });
    return await modal.present();
  }

}
