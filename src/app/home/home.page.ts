import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {AutosPage} from '../mantenedores/autos/autos.page';
import {FinalizacionPage} from './modals/finalizacion/finalizacion.page';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MantenedorService} from '../services/mantenedor.service';
import {Marca} from '../models/marca';
import {Modelo} from '../models/modelo';
import {Reserva} from '../models/reserva';
import {TipoServicio} from '../models/tipoServicio';
import {Region} from '../models/region';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];
  isModelo = true;
  isTipoServicio = true;
  isRegion = true;
  Marca: any;
  Modelo: any;
  reserva: Reserva = new Reserva();
  TipoServicio: any;
  Region: any;

  carForm: FormGroup;
  serviceForm: FormGroup;
  placeForm: FormGroup;
  mecanicoForm: FormGroup;
  pagoForm: FormGroup;
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
  valueDefault: string;
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  fechaHoy: Date = new Date();

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private modalController: ModalController, private router: Router, public formBuilder: FormBuilder,
              private alertController: AlertController,
              private mantService: MantenedorService,
              private loadingController: LoadingController) {
    this.valueDefault = 'paso1';
    this.carForm = formBuilder.group({
      patente: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      anio: ['', Validators.compose([Validators.required])],
      cilindrada: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[0-9.]*'), Validators.required])],
    });
    this.serviceForm = formBuilder.group({
      tipo: ['', Validators.compose([Validators.required])],
      mantencion: ['', Validators.compose([Validators.required])],
    });
    this.placeForm = formBuilder.group({
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      calle: ['', Validators.compose([Validators.required])],
    });
    this.mecanicoForm = formBuilder.group({
      mecanico: ['', Validators.compose([Validators.required])],
      fechaR: ['', Validators.compose([Validators.required])],
    });
    this.pagoForm = formBuilder.group({
      pago: ['', Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {
    await this.mantService.getAllMarca().snapshotChanges().subscribe(res => {
      this.Marca = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Marca.push(a as Marca);
      });
    });
    await this.mantService.getAllTipoServicio().snapshotChanges().subscribe(res => {
      this.TipoServicio = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.TipoServicio.push(a as TipoServicio);
      });
      this.TipoServicio.forEach(item => {
        if (item.nombre.toUpperCase().indexOf('MANTENCION') > -1 && item.estado) {
          this.reserva.idTipoServicio = item.$key;
          return;
        }
      });
    });

    await this.mantService.getAllregion().snapshotChanges().subscribe(res => {
      this.Region = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        this.Region.push(a as Region);
      });
      this.Region.forEach(item => {
        if (item.id === 7) {
          this.reserva.idRegion = item.id;
          return;
        }
      });
    });

  }

  async selectModel(evt) {
    this.reserva.idModelo = '';
    const modelo = await this.mantService.getModeloByMarca(Number(evt.target.value));
    this.Modelo = [];
    modelo.on('child_added', (snapshot) => {
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.Modelo.push(a as Modelo);
    });
    await this.presentLoading();
    this.isModelo = false;

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


  validaCarForm() {
    if (this.carForm.valid) {
      this.hideC1 = false;
      this.hidePaso2 = false;
      this.valueDefault = 'paso2';
      this.hideC2 = true;
    } else {
      this.presentAlert();
    }
  }

  validaServiceForm() {
    if (this.serviceForm.valid) {
      this.hideC2 = false;
      this.hidePaso3 = false;
      this.hideC3 = true;
      this.valueDefault = 'paso3';
    } else {
      this.presentAlert();
    }
  }

  serviceFormBack() {
    this.hideC1 = true;
    this.hidePaso2 = true;
    this.hideC2 = false;
    this.valueDefault = 'paso1';
  }

  validaDireccionForm() {
    if (this.placeForm.valid) {
      this.hideC3 = false;
      this.hidePaso4 = false;
      this.hideC4 = true;
      this.valueDefault = 'paso4';
    } else {
      this.presentAlert();
    }
  }

  direccionFormBack() {
    this.hideC2 = true;
    this.hidePaso3 = true;
    this.hideC3 = false;
    this.valueDefault = 'paso2';
  }

  validaMecanicoForm() {
    if (this.mecanicoForm.valid) {
      this.hideC4 = false;
      this.hidePaso5 = false;
      this.hideC5 = true;
      this.valueDefault = 'paso5';
    } else {
      this.presentAlert();
    }
  }

  mecanicoFormBack() {
    this.hideC3 = true;
    this.hidePaso4 = true;
    this.hideC4 = false;
    this.valueDefault = 'paso3';
  }

  validaPagoForm() {
    if (this.pagoForm.valid) {

    } else {
      this.presentAlert();
    }
  }

  pagoFormBack() {
    this.hideC4 = true;
    this.hidePaso5 = true;
    this.hideC5 = false;
    this.valueDefault = 'paso4';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Formulario',
      message: 'Faltan campos que llenar.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
      duration: 1000
    });
    await loading.present();
  }

  parseDate() {
    const anio = new Date(this.reserva.anioAuto);
    this.reserva.anioAuto = anio.getFullYear();
  }

  parseUpperCase() {
    this.reserva.patente = this.reserva.patente.toUpperCase();
  }

}
