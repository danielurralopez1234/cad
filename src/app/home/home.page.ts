import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FinalizacionPage} from './modals/finalizacion/finalizacion.page';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MantenedorService} from '../services/mantenedor.service';
import {Marca} from '../models/marca';
import {Modelo} from '../models/modelo';
import {Reserva} from '../models/reserva';
import {TipoServicio} from '../models/tipoServicio';
import {Region} from '../models/region';
import {Comuna} from '../models/comuna';
import {TipoMantencion} from '../models/tipoMantencion';
import {Mecanico} from '../models/mecanico';
import {MisAutos} from '../models/misAutos';
import {AuthenticationService} from '../services/authentication.service';
import {AgendaMecanico} from '../models/agendaMecanico';
import {Finaliza} from '../models/finaliza';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isModelo = true;
  isTipoServicio = true;
  isRegion = true;
  Marca: any;
  Modelo: any;
  Comuna: any;
  Mecanicos: any;
  reserva: Reserva = new Reserva();
  misAutos: MisAutos = new MisAutos();
  agenda: AgendaMecanico = new AgendaMecanico();
  finaliza: Finaliza = new Finaliza();
  TipoServicio: any;
  TipoMantencion: any;
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
  nombreDias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  fechaHoy: Date = new Date();
  diaSelect: string;
  numDiaSelect: string;
  mesSelect: string;
  isPrecarga = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private modalController: ModalController, private router: Router, public formBuilder: FormBuilder,
              private alertController: AlertController,
              private mantService: MantenedorService,
              private loadingController: LoadingController,
              private authService: AuthenticationService) {
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
          this.selectTipoMantencion(this.reserva.idTipoServicio);
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
          this.selectComuna(item.id);
          return;
        }
      });
    });
  }

  async selectModel(evt) {
    this.misAutos.modelo = '';
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

  async finalizaModal(params: any) {
    const modal = await this.modalController.create({
      component: FinalizacionPage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();
  }

  async validaCarForm() {
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

      this.TipoMantencion.forEach(t => {
        if (t.$key === this.reserva.idTipoMantencion) {
          this.finaliza.mantencion = t.nombre;
        }
      });

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

  async validaDireccionForm() {
    if (this.placeForm.valid) {
      this.hideC3 = false;
      this.hidePaso4 = false;
      this.hideC4 = true;
      this.valueDefault = 'paso4';
      this.finaliza.direccion = this.reserva.direccion + ' ';
      await this.Comuna.forEach(c => {
        if (c.$key === this.reserva.idComuna) {
          console.log(c.nombre);
          this.finaliza.direccion += c.nombre + ' - ';
        }
      });
      await this.Region.forEach(r => {
        if (r.$key === this.reserva.idRegion) {
          console.log(r.nombre);
          this.finaliza.direccion += r.nombre + ' ';
        }
      });
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

  async validaMecanicoForm() {
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

  async validaPagoForm() {
    if (this.pagoForm.valid) {
      this.reserva.idPago = this.pagoForm.value.pago;
      this.reserva.fecha = new Date().toLocaleDateString();
      this.finalizaReserva();
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
    const anio = new Date(this.misAutos.anio);
    console.log(anio);
    this.misAutos.anio = anio.getFullYear();
    console.log(this.misAutos.anio);
  }

  parseUpperCase() {
    this.misAutos.patente = this.misAutos.patente.toUpperCase();
  }

  async selectComuna(id: number) {
    this.reserva.idComuna = '';
    const comuna = await this.mantService.getComunaByRegion(id);
    this.Comuna = [];
    comuna.on('child_added', (snapshot) => {
      const a = snapshot.val();
      this.Comuna.push(a as Comuna);
    });
  }

  async selectTipoMantencion(id: string) {
    this.reserva.idTipoMantencion = '';
    const tipo = await this.mantService.getMantencionByServicio(id);
    this.TipoMantencion = [];
    tipo.on('child_added', (snapshot) => {
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.TipoMantencion.push(a as TipoMantencion);
    });
  }

  async selectMecanico() {
    // agregar el sector una vez se pueda agregar mecanicos
    let sec;
    this.Comuna.forEach(r => {
      if (r.id === this.reserva.idComuna) {
        sec = r.sector;
      }
    });
    this.agenda.idMecanico = '';
    await this.mantService.getMecanicoByRolSector(2, sec).on('child_added', (snapshot) => {
      this.Mecanicos = [];
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.Mecanicos.push(a as Mecanico);
    });
  }

  async fechaMantencion(evt: any) {
    const newDate = new Date(evt.target.value);
    // await this.presentLoading();
    this.diaSelect = evt.target.dayShortNames[newDate.getDay()];
    this.numDiaSelect = newDate.toLocaleDateString().substring(0, 2);
    this.mesSelect = 'de ' + evt.target.monthShortNames[newDate.getMonth()];
    this.finaliza.fecha = this.diaSelect + ' ' + this.numDiaSelect + ' ' + this.mesSelect + ', ' + newDate.getFullYear();
    this.isPrecarga = true;
  }

  selectedHora(evt: any) {
    const idbtn = evt.target.id;
    if (idbtn !== null && idbtn.length > 0) {
      const btn = document.getElementById(idbtn);
      btn.className += ' color-activated';
      if (idbtn !== 'btn-9') {
        document.getElementById('btn-9').classList.remove('color-activated');
      }
      if (idbtn === 'btn-9') {
        this.agenda.hora = '09:00';
      }
      if (idbtn !== 'btn-11') {
        document.getElementById('btn-11').classList.remove('color-activated');
      }
      if (idbtn === 'btn-11') {
        this.agenda.hora = '11:00';
      }
      if (idbtn !== 'btn-13') {
        document.getElementById('btn-13').classList.remove('color-activated');
      }
      if (idbtn === 'btn-13') {
        this.agenda.hora = '13:00';
      }
      if (idbtn !== 'btn-15') {
        document.getElementById('btn-15').classList.remove('color-activated');
      }
      if (idbtn === 'btn-15') {
        this.agenda.hora = '15:00';
      }
      if (idbtn !== 'btn-17') {
        document.getElementById('btn-17').classList.remove('color-activated');
      }
      if (idbtn === 'btn-17') {
        this.agenda.hora = '17:00';
      }
      if (idbtn !== 'btn-19') {
        document.getElementById('btn-19').classList.remove('color-activated');
      }
      if (idbtn === 'btn-19') {
        this.agenda.hora = '19:00';
      }
    }
  }

  async finalizaReserva() {
    await this.authService.getSesionStorage().then(resp => {
      if (resp !== undefined) {
        this.misAutos.idUsuario = resp.id;
        this.reserva.idUsuario = resp.id;
        this.finaliza.nombre = resp.nombre;
      }
    });
    this.misAutos.estado = true;
    await this.mantService.saveMisAutos(this.misAutos).then(resId => {
      this.reserva.idAuto = resId.toString();
    }).catch(err => console.log('error al guardar ' + err));

    this.agenda.estado = true;
    await this.mantService.saveAgenda(this.agenda).then(respId => {
      this.reserva.idAgenda = respId.toString();
    }).catch(err => console.log('error al guardar ' + err));

    await this.mantService.saveReserva(this.reserva).then(respId => {
      console.log('guardado ok: ' + respId);
      this.finaliza.idReserva = respId.toString();
      this.finalizaModal(this.finaliza);
    }).catch(err => console.log('Error al guardar ' + err));

  }

}
