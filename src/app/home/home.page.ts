import { Component } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: any[] = [];
  hidePaso1 = false;
  hidePaso2 = false;
  hidePaso3 = true;
  hidePaso4 = true;
  hidePaso5 = true;
  hideC1 = true;
  hideC2 = false;
  hideC3 = false;
  hideC4 = false;
  hideC5 = false;
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  fechaHoy: Date = new Date();

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() {
  }


  habilita1() {
    this.hidePaso1 = true;
  }
  habilita2() {
    this.hidePaso1 = true;
  }
  habilita3() {
    this.hidePaso1 = true;
  }
  habilita4() {
    this.hidePaso1 = true;
  }
  habilita5() {
    this.hidePaso1 = true;
  }

  segmentChanged(ev: any) {
    this.hidePaso3 = false;
    this.hideC1 = false;
    this.hideC2 = true;
    console.log('Segment changed', ev);
  }

}
