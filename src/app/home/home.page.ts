import { Component } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ModalController} from '@ionic/angular';
import {AutosPage} from '../mantenedores/autos/autos.page';
import {FinalizacionPage} from './modals/finalizacion/finalizacion.page';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: any[] = [];
  patente: string;
  modelo: string;
  marca: string;
  anio: number;
  cilindrada: string;
  myForm: FormGroup;
  hidePaso1 = false;
  hidePaso2 = true;
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
  constructor(private modalController: ModalController, private router: Router, public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      patente: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      anio: ['', Validators.compose([Validators.required])],
      cilindrada: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[0-9.]*'), Validators.required])],
    });
  }
  async finalizaModal() {
    const modal = await this.modalController.create({
      component: FinalizacionPage
    });
    // await this.router.navigateByUrl('home');
    return await modal.present();
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
