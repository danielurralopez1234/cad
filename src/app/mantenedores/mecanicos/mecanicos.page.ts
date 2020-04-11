import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddeditMecanicosPage} from './modals/addedit-mecanicos/addedit-mecanicos.page';
import {MantenedorService} from '../../services/mantenedor.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.page.html',
  styleUrls: ['./mecanicos.page.scss'],
})
export class MecanicosPage implements OnInit {
  shell: boolean;
  Usuario: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService) { this.shell = true; }

  ngOnInit() {
    const formaPagoRes = this.mantService.getAllmecanico();
    formaPagoRes.snapshotChanges().subscribe(res => {
      this.Usuario = [];
      res.forEach(item => {
        const u = item.payload.toJSON();
        u['$key'] = item.key;
        this.Usuario.push(u as Usuario);
      });
    });
  }

  activando() {
    console.log(this.shell);
  }

  async addeditModal() {
    const modal = await this.modalController.create({
      component: AddeditMecanicosPage
    });
    return await modal.present();
  }
}
