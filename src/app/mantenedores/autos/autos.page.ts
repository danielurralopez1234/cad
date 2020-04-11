import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddeditAutoPage} from './modals/addedit-auto/addedit-auto.page';
import {MantenedorService} from '../../services/mantenedor.service';
import {Auto} from '../../models/auto';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  shell: boolean;
  Auto: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService) {
    this.shell = true;
  }

  ngOnInit() {
    const autoeRes = this.mantService.getAllauto();
    autoeRes.snapshotChanges().subscribe(res => {
      this.Auto = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Auto.push(a as Auto);
      });
    });
  }

  activando() {
    console.log(this.shell);
  }

  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditAutoPage
    });
    return await modal.present();
  }

}
