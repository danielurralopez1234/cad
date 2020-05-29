import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {MantenedorService} from '../../../services/mantenedor.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {
  autoRes: any = [];
  marcaRes: any = [];
  modeloRes: any = [];

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private mantService: MantenedorService) { }

  async ngOnInit() {
    const idMisautos = this.navParams.get('ID');
    await this.mantService.getMisautosById(idMisautos).subscribe(snap => {
      this.autoRes = snap;
      this.mantService.getMarcaById(this.autoRes.marca).subscribe(marca => {
        this.marcaRes = marca;
      });
      this.mantService.getModeloById(this.autoRes.modelo).subscribe(modelo => {
        this.modeloRes = modelo;
      });
    });
  }
  async modalClose() {
    await this.modalController.dismiss();
  }
}
