import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {MantenedorService} from '../../../services/mantenedor.service';

@Component({
  selector: 'app-aceite-info',
  templateUrl: './aceite-info.page.html',
  styleUrls: ['./aceite-info.page.scss'],
})
export class AceiteInfoPage implements OnInit {
  aceiteRes: any = [];

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private mantService: MantenedorService) { }

  async ngOnInit() {
    const idAceite = this.navParams.get('ID');
    await this.mantService.getAceiteById(idAceite).subscribe(snap => {
      this.aceiteRes = snap;
    });
  }
  async modalClose() {
    await this.modalController.dismiss();
  }

}
