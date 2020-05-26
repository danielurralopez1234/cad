import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MantenedorService} from '../services/mantenedor.service';
import {AgendaMecanico} from '../models/agendaMecanico';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  Agenda: any;
  nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private authService: AuthenticationService,
              private mantService: MantenedorService,
              private loadingController: LoadingController) {
  }

  async ngOnInit() {
    await this.authService.getSesionStorage().then(async data => {
      if (data !== undefined) {
        await this.mantService.getReservaByUid(data.id).on('value', async (snapshot) => {
          snapshot.forEach(val => {
            this.Agenda = [];
            this.mantService.getAgendaById(val.val().idAgenda).once('value').then(ag => {
              console.log(ag.val());
              const a = ag.val();
              a['$key'] = ag.key;
              const newDate = new Date(a.fecha);
              if (a.hora.substring(0, 2) > 11) {
                a.hora = a.hora + ' PM';
              } else {
                a.hora = a.hora + ' AM';
              }
              a.fecha = this.nombreMeses[newDate.getMonth()] + ' ' + newDate.toLocaleDateString().substring(0, 2);
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
        });
      }
    });
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 200
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

}
