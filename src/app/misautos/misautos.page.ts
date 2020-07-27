import { Component, OnInit } from '@angular/core';
import {MisAutos} from '../models/misAutos';
import {MantenedorService} from '../services/mantenedor.service';
import {AuthenticationService} from '../services/authentication.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {EditMisautosPage} from './edit-misautos/edit-misautos.page';

@Component({
  selector: 'app-misautos',
  templateUrl: './misautos.page.html',
  styleUrls: ['./misautos.page.scss'],
})
export class MisautosPage implements OnInit {
  MisAutos: any;
  uid: string;

  constructor(private mantService: MantenedorService,
              private authService: AuthenticationService,
              private alertController: AlertController,
              private toastController: ToastController,
              private modalController: ModalController) {}

  async ngOnInit() {
    await this.mantService.getAllMisAutos().snapshotChanges().subscribe(async resp => {
      await this.authService.getSesionStorage().then(str => {
        this.uid = str.id;
      });
      this.MisAutos = [];
      resp.forEach(item => {
        const a = item.payload.toJSON();
        if (a['idUsuario'] === this.uid ) {
          a['$key'] = item.key;
          this.mantService.getMarcaById(a['marca']).subscribe(marca => {
            a['nomMarca'] = marca['nombre'];
          });
          this.mantService.getModeloById(a['modelo']).subscribe(modelo => {
            a['nomModelo'] = modelo['nombre'];
          });
          this.MisAutos.push(a as MisAutos);
        }
      });
    });
  }
  async deleteAlertConfirm(key: string, patente: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar auto<strong> ' + patente + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteAceite(key);
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteAceite(id: string) {
    await this.mantService.deleteMisAutos(id).then(res => {
      this.presentToast('Auto Eliminado.');
      this.MisAutos = [];
    }).catch(err => this.presentToast('Problemas al eliminar auto.'));
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  async addeditModal(id: string, marca: string, modelo: string, patente: string, anio: string, cilindrada: string) {
    const modal = await this.modalController.create({
      component: EditMisautosPage,
      componentProps: {
        ID: id,
        MARCA: marca,
        MODELO: modelo,
        PATENTE: patente,
        ANIO: anio,
        CILINDRADA: cilindrada,
      }
    });
    return await modal.present();
  }
}
