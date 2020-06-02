import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import { environment} from '../../../../environments/environment';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  imgStatic: any;

  constructor(private modalController: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    const dire = this.navParams.get('DIRE');
    const region = this.navParams.get('REGION')
    console.log(dire);
    console.log(region);

    this.imgStatic = 'https://maps.googleapis.com/maps/api/staticmap?center=' + dire + ',' + region + ',CL&zoom=15&size=600x600&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + dire + '&key=' + environment.API_KEY_GOOGLE;

/*
`https://maps.googleapis.com/maps/api/staticmap?center=Chiloe+4911,Region+Metropolitana,CL&zoom=15&size=600x600&maptype=roadmap
&markers=color:blue%7Clabel:S%7Cchiloe+4911&key=environment.API_KEY_GOOGLE`;
 */

  }
  async modalClose() {
    await this.modalController.dismiss();
  }

}
