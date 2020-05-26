import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MantenedorService} from '../services/mantenedor.service';
import {AgendaMecanico} from '../models/agendaMecanico';
import {LoadingController} from '@ionic/angular';

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
              private loadingController: LoadingController) { }

  async ngOnInit() {
    await this.authService.getSesionStorage().then(async data => {
      if (data !== undefined) {
        this.Agenda = [];
        this.mantService.getAgendaByIdMecanico(data.id).on('value', snap => {
          snap.forEach(item => {
            let nomComuna = '';
            this.mantService.getReservaByIdAgenda(item.key).once('child_added').then(async rba => {
              await this.mantService.getComunaById(rba.val().idComuna).then(com => {
                nomComuna = com.val().nombre;
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
              a['direccion'] = rba.val().direccion + ' - ' + nomComuna;
              this.Agenda.push(a as AgendaMecanico);
            });
          });
        });
        /*
        .then(ag => {
          ag.forEach(t => {
            this.mantService.getReservaByIdAgenda(ag.key).once('value').then(rba => {
              console.log(rba.val());
            });
            const a = t.val();
            a['$key'] = ag.key;
            const newDate = new Date(a.fecha);
            a.fecha = newDate.toLocaleDateString().substring(0, 2) + ' ' + this.nombreMeses[newDate.getMonth()];
            if (a.estado === 1) {
              a['color'] = 'warning';
            } else if (a.estado === 2) {
              a['color'] = 'success';
            } else {
              a['color'] = 'danger';
            }
            this.Agenda.push(a as AgendaMecanico);
          });
        });
        */
      }
    });
    this.presentLoading();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
