import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MantenedorService} from '../services/mantenedor.service';
import {AgendaMecanico} from '../models/agendaMecanico';
import {LoadingController, ModalController} from '@ionic/angular';
import {ClientePage} from './modals/cliente/cliente.page';
import {UbicacionPage} from './modals/ubicacion/ubicacion.page';
import {AutoPage} from './modals/auto/auto.page';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  Agenda: any;
  nombreMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  constructor(private authService: AuthenticationService,
              private mantService: MantenedorService,
              private loadingController: LoadingController,
              private modalController: ModalController) { }

  async ngOnInit() {
    const uid = await this.authService.getSesionStorageByUid();
    await this.mantService.getAgendaByIdMecanico(uid.toString()).on('value', snap => {
      snap.forEach(item => {
        let nomComuna = '';
        let nomRegion = '';
        this.Agenda = [];
        this.mantService.getReservaByIdAgenda(item.key).once('child_added').then(async rba => {
          await this.mantService.getComunaById(rba.val().idComuna).then(com => {
            nomComuna = com.val().nombre;
          });
          await this.mantService.getRegionById(rba.val().idRegion).then(reg => {
            nomRegion = reg.val().nombre;
          });
          const a = item.val();
          a['$key'] = item.key;
          const newDate = new Date(a.fecha);
          a.fecha = newDate.toLocaleDateString().substring(0, 2) + ' ' + this.nombreMeses[newDate.getMonth()];
          if (a.estado === 1) {
            a['color'] = 'warning';
          } else if (a.estado === 2) {
            a['color'] = 'success';
          } else {
            a['color'] = 'danger';
          }
          a['direccion'] = rba.val().calle + ' ' + rba.val().calleNum + ' - ' + nomComuna + ' - ' + nomRegion;
          a['calle'] = rba.val().calle;
          a['calleNum'] = rba.val().calleNum;
          a['nomComuna'] = nomComuna;
          a['nomRegion'] = nomRegion;
          a['idUsuario'] = rba.val().idUsuario;
          a['idAuto'] = rba.val().idMiAuto;
          this.Agenda.push(a as AgendaMecanico);
        });
      });
    });
    await this.presentLoading();
    if (this.Agenda !== undefined) {
      this.Agenda = this.Agenda.slice().reverse();
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
  doRefrescar(event: any) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  async getClient(id: string) {
    const modal = await this.modalController.create({
      component: ClientePage,
      componentProps: {
        UID: id
      }
    });
    return await modal.present();
  }
  async getMap(calle: string, numero: number, comuna: string, region: string) {
    const modal = await this.modalController.create({
      component: UbicacionPage,
      componentProps: {
        DIRE: calle + '+' + numero,
        REGION: region,
        COMUNA: comuna
      }
    });
    return await modal.present();
  }
  async getCar(id: string) {
    const modal = await this.modalController.create({
      component: AutoPage,
      componentProps: {
        ID: id
      }
    });
    return await modal.present();
  }

}
