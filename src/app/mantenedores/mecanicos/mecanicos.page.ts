import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {AddeditMecanicosPage} from './modals/addedit-mecanicos/addedit-mecanicos.page';
import {MantenedorService} from '../../services/mantenedor.service';
import { Usuario } from '../../models/usuario';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.page.html',
  styleUrls: ['./mecanicos.page.scss'],
})
export class MecanicosPage implements OnInit {
  Usuario: any;
  auxUsuarios: any;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private alertController: AlertController,
              private usersService: UsersService) {  }

  async ngOnInit() {
    await this.usersService.getAllUsuarios().snapshotChanges().subscribe(res => {
      this.Usuario = [];
      res.forEach(item => {
        const u = item.payload.toJSON();
        u['$key'] = item.key;
        const j = u as Usuario;
        if (j.rol === 2) {
        this.Usuario.push(u as Usuario);
        }
        this.auxUsuarios = this.Usuario;
      });
    });
  }

  async updateUsuario(id: string, est: boolean) {
    est = !est;
    await this.mantService.updateUsuario(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }
  searchUsuario(ev) {
    const val = ev.target.value;
    this.Usuario = this.auxUsuarios;
    if (val.trim() !== '') {
      this.Usuario = this.Usuario.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      });
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async addeditModal(id: string) {
    let params;
    if (id === null) {
      params = id;
    } else {
      params = this.Usuario.filter((item) => {
        return (item.$key.toLowerCase() === id.toString().toLocaleLowerCase());
      });
    }
    const modal = await this.modalController.create({
      component: AddeditMecanicosPage,
      componentProps: {
        data: params
      }
    });
    return await modal.present();
  }
  async deleteUsuario(id: string) {
    await this.mantService.deleteUsuario(id).then(res => {
      this.presentToast('Eliminado.');
    }).catch(err => this.presentToast('Problemas al eliminar registro.'));
  }
  async deleteAlertConfirm(key: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion!',
      message: 'Eliminar mecanico<strong> ' + nombre + ' </strong>!!! ???',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteUsuario(key);
          }
        }
      ]
    });

    await alert.present();
  }
}
