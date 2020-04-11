import { Component, OnInit } from '@angular/core';
import {AddeditServicioPage} from './modals/addedit-servicio/addedit-servicio.page';
import {MantenedorService} from '../../services/mantenedor.service';
import { Servicio } from '../../models/servicio';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  shell: boolean;
  Servicio: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService) { this.shell = true; }

  ngOnInit() {
    const servicioRes = this.mantService.getAllservicio();
    servicioRes.snapshotChanges().subscribe(res => {
      this.Servicio = [];
      res.forEach(item => {
        const s = item.payload.toJSON();
        s['$key'] = item.key;
        this.Servicio.push(s as Servicio);
      });
    });
  }

  activando() {
    console.log(this.shell);
  }

  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditServicioPage
    });
    return await modal.present();
  }


}
