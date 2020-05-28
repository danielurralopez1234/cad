import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MantenedorService} from '../services/mantenedor.service';
import {AgendaMecanico} from '../models/agendaMecanico';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

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
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController) {
  }

  async ngOnInit() {
    await this.authService.getSesionStorage().then(async data => {
      if (data !== undefined && data.id !== undefined) {
        await this.mantService.getReservaByUid(data.id).on('value', async (snapshot) => {
          snapshot.forEach(val => {
            this.Agenda = [];
            this.mantService.getAgendaById(val.val().idAgenda).once('value').then(ag => {
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

  async cancelAlertConfirm(key: string, nombre: string, estado: number) {
    if (estado === 1) {
      const alert = await this.alertController.create({
        header: 'Confirmacion!',
        message: 'Cancelar reserva<strong> ' + nombre + ' </strong>!!! ???',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Si',
            handler: () => {
              this.cancelarReserva(key, 0);
            }
          }
        ]
      });

      await alert.present();
    } else {
      this.presentToast('Ya no puedes cambiar estado a esta reserva.');
    }
  }

  async cancelarReserva(id: string, estado: number) {
    await this.mantService.updateAgenda(id, estado).then(res => {
      this.presentToast('Actualizado.');
      this.ngOnInit();
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
