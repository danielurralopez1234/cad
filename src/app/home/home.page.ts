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
import {Horario} from '../models/horario';
import {TipoCombustible} from '../models/tipoCombustible';
import {Aceite} from '../models/aceite';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isModelo = true;
  isCilindrada = true;
  isMarca = true;
  isTipo = true;
  isAnio = true;
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
  anio: any;
  TipoCom: any = [];

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
  Horarios: any;
  preId: any;
  horaAg = [];
  isFechaR = true;
  isMisAutos = false;
  AceiteFoto: any;
  idAceiteAux: any;
  checkAceiteAux: any;

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
      tipo: ['', Validators.compose([Validators.required])]
    });
    this.serviceForm = formBuilder.group({
      tipo: ['', Validators.compose([Validators.required])],
      mantencion: ['', Validators.compose([Validators.required])],
    });
    this.placeForm = formBuilder.group({
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      calle: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      calleNum: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
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
    await this.mantService.getAllTipoCombustible().snapshotChanges().subscribe( res => {
        res.forEach(item => {
            const a = item.payload.toJSON();
            a['$key'] = item.key;
            this.TipoCom.push(a as TipoCombustible);
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

  async selectModel(evt, idModelo?: string) {
    this.misAutos.modelo = '';
    const modelo = await this.mantService.getModeloByMarca(Number(evt.target.value));
    this.Modelo = [];
    modelo.on('child_added', (snapshot) => {
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.Modelo.push(a as Modelo);
    });
    await this.presentLoading();
    if (idModelo !== undefined && idModelo.length > 0) {
      this.misAutos.modelo = idModelo;
    } else {
      if (evt.target.value !== '') {
        this.isModelo = false;
      }
    }
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
    if (this.serviceForm.valid && this.checkAceiteAux === true) {
      this.hideC2 = false;
      this.hidePaso3 = false;
      this.hideC3 = true;
      this.valueDefault = 'paso3';
      this.TipoServicio.forEach(s => {
        if (s.$key === this.reserva.idTipoServicio) {
          this.agenda.servicio = s.nombre;
        }
      });
      this.TipoMantencion.forEach(t => {
        if (t.$key === this.reserva.idTipoMantencion) {
          this.finaliza.mantencion = t.nombre;
          this.agenda.mantencion = t.nombre;
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
        if (this.Mecanicos !== undefined && this.Mecanicos.length > 0) {
            this.hideC3 = false;
            this.hidePaso4 = false;
            this.hideC4 = true;
            this.valueDefault = 'paso4';
            this.finaliza.direccion = this.reserva.calle + ' ' + this.reserva.calleNum;
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
            this.presentAlertSinMeca('Comuna sin mecanicos disponible!!');
        }
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
    console.log(this.agenda.hora);
    if (this.mecanicoForm.valid && this.agenda.hora !== undefined) {
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

  async presentAlertSinMeca(mensaje: string) {
      const alert = await this.alertController.create({
          header: 'Formulario',
          message: mensaje,
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
    const anio = new Date(this.anio);
    this.misAutos.anio = anio.getUTCFullYear();
  }

  parseUpperCase() {
    this.misAutos.patente = this.misAutos.patente.toUpperCase();
    this.isMarca = true;
    this.isModelo = true;
    this.isAnio = true;
    this.isCilindrada = true;
    this.isTipo = true;
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
    let sec;
    this.Comuna.forEach(r => {
      if (r.id === this.reserva.idComuna) {
        sec = r.sector;
      }
    });
    this.agenda.idMecanico = '';
    await this.mantService.getMecanicoByRolSector(2).on('value', (snapshot) => {
        this.Mecanicos = [];
        snapshot.forEach(item => {
            if (item.val().sector === sec) {
                const a = item.val();
                a['$key'] = item.key;
                this.Mecanicos.push(a as Mecanico);
            }
        });

    });
  }

  async fechaMantencion(evt: any) {
    const newDate = new Date(evt.target.value);
    this.horaAg = [];
    // await this.presentLoading();
    this.diaSelect = evt.target.dayShortNames[newDate.getDay()];
    this.numDiaSelect = newDate.toLocaleDateString().substring(0, 2);
    this.mesSelect = 'de ' + evt.target.monthShortNames[newDate.getMonth()];
    this.finaliza.fecha = this.diaSelect + ' ' + this.numDiaSelect + ' ' + this.mesSelect + ', ' + newDate.getFullYear();
    await this.mantService.getAgendaByIdMecanico(this.agenda.idMecanico).once('value', snap => {
      snap.forEach(val => {
        if (val.val().estado === 1) {
          const fecAg = new Date(val.val().fecha);
          if (newDate.toLocaleDateString() === fecAg.toLocaleDateString()) {
            this.horaAg.push(val.val().hora);
          }
        }
      });
    });
    await this.mantService.getAllHorario().snapshotChanges().subscribe(resp => {
      this.Horarios = [];
      resp.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        if (this.horaAg.length > 0) {
          this.horaAg.forEach(hr => {
            if (hr === item.payload.val()['hora']) {
              a['bloquear'] = true;
              a['icono'] = 'close-circle';
            } else {
              a['bloquear'] = false;
              a['icono'] = 'checkmark-circle';
            }
          });
        } else {
            a['bloquear'] = false;
            a['icono'] = 'checkmark-circle';
        }
        this.Horarios.push(a as Horario);
      });
    });
    this.isPrecarga = true;
  }

  selectedHora(evt: any, hora: any) {
    const idbtn = evt;
    console.log(idbtn);
    console.log(this.preId);
    if (this.preId !== undefined) {
      if (this.preId !== idbtn) {
        document.getElementById(this.preId).classList.remove('color-activated');
      }
      this.preId = idbtn;
    } else {
      this.preId = idbtn;
    }
    const btn = document.getElementById(idbtn);
    btn.className += ' color-activated';
    this.agenda.hora = hora;

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
    if (this.isMisAutos) {
      await this.mantService.saveMisAutos(this.misAutos).then(resId => {
        this.reserva.idAuto = resId.toString();
      }).catch(err => console.log('error al guardar ' + err));
    }
    this.agenda.estado = 1;
    await this.mantService.saveAgenda(this.agenda).then(respId => {
      this.reserva.idAgenda = respId.toString();
    }).catch(err => console.log('error al guardar ' + err));

    await this.mantService.saveReserva(this.reserva).then(respId => {
      console.log('guardado ok: ' + respId);
      this.finaliza.idReserva = respId.toString();
      this.finaliza.valorTotal = this.reserva.valor;
      this.finalizaModal(this.finaliza);
    }).catch(err => console.log('Error al guardar ' + err));

  }

  async buscarMisAutos() {
    if (this.misAutos.patente !== undefined) {
      this.isCilindrada = false;
      this.isMisAutos = false;
      this.isMarca = false;
      this.isAnio = false;
      this.isTipo = false;
      this.misAutos.anio = 0;
      this.anio = '';
      this.misAutos.cilindrada = '';
      this.misAutos.modelo = '';
      this.misAutos.marca = '';
      let uid = '';
      await this.authService.getSesionStorage().then(data => {
        uid = data.id;
      });
      await this.mantService.getMisautosByPatente(this.misAutos.patente).then(async resp => {
        this.isCilindrada = true;
        this.isMarca = true;
        this.isAnio = true;
        if (resp.val().idUsuario === uid) {
          this.isMisAutos = true;
          this.misAutos.anio = resp.val().anio;
          this.anio = resp.val().anio + 1;
          this.misAutos.cilindrada = resp.val().cilindrada;
          this.misAutos.modelo = resp.val().modelo;
          this.misAutos.marca = resp.val().marca;
        } else {
          this.isModelo = true;
          await this.presentAlertBuscar();
        }
      });
    }
  }
  async presentAlertBuscar() {
    const alert = await this.alertController.create({
      header: 'Formulario',
      message: 'Patente registrada a otro cliente.',
      buttons: ['OK']
    });

    await alert.present();
  }
  habilitaFecha() {
    this.isFechaR = false;
  }

  async selectAceite() {
    await this.mantService.getAllAceite().snapshotChanges().subscribe(snap => {
      this.AceiteFoto = [];
      let x = 1;
      snap.forEach(item => {
        const a = item.payload.toJSON();
        if (a['tipoCom'] === this.misAutos.combustible && x < 4) {
          a['$key'] = item.key;
          this.AceiteFoto.push(a as Aceite);
          x = x + 1;
        }
      });
    });
  }

  selectTipoAceite(evt: any, valor: number) {
      if (this.idAceiteAux === undefined) {
          this.idAceiteAux = evt.target.id;
          this.checkAceiteAux = evt.target.checked;
          this.reserva.idAceite = this.idAceiteAux;
      } else {
          if (this.idAceiteAux !== evt.target.id && this.checkAceiteAux === true) {
              document.getElementById(this.idAceiteAux).click();
          }
          this.idAceiteAux = evt.target.id;
          this.checkAceiteAux = evt.target.checked;
          this.reserva.idAceite = this.idAceiteAux;
          this.reserva.valor = valor;
      }
  }

}
