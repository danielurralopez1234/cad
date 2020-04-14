import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {Aceite} from '../../../../models/aceite';
import {MantenedorService} from '../../../../services/mantenedor.service';

@Component({
  selector: 'app-addedit-aceite',
  templateUrl: './addedit-aceite.page.html',
  styleUrls: ['./addedit-aceite.page.scss'],
})
export class AddeditAceitePage implements OnInit {
  aceite: Aceite = new Aceite();
  auxParam: any = [];
  id: string;
  file: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams) {
    if (navParams.get('data') !== null) {
      this.auxParam.push(navParams.get('data') as Aceite);
      this.auxParam.forEach(item => {
        this.aceite.tipoCar = item[0].tipoCar;
        this.aceite.nombre = item[0].nombre;
        this.aceite.descripcion = item[0].descripcion;
        this.aceite.valor = item[0].valor;
        this.aceite.foto = item[0].foto;
        this.aceite.estado = item[0].estado;
        this.id = item[0].$key;
      });
    }
  }

  ngOnInit() {
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveUpdateAceite() {
    if (this.auxParam.length === 0) {
      this.aceite.estado = false;
      await this.mantService.saveAceite(this.aceite).then(async resId => {
        console.log('id aceite: ' + resId);
        await this.mantService.upLoadImage(this.file, resId.toString()).then(resPathImg => {
          console.log('path img: ' + resPathImg);
          this.mantService.updateAceiteFoto(resId.toString(), resPathImg.toString());
        });
        this.presentToast('Registro exitoso.');
      }).catch(err => this.presentToast('Error al guardar registro'));
    } else {
      await this.mantService.updateAceitePop(this.id, this.aceite).then(async res => {
        if (this.file !== undefined) {
          await this.mantService.upLoadImage(this.file, this.id).then(resPathImg => {
            console.log('path img update: ' + resPathImg);
            this.mantService.updateAceiteFoto(this.id, resPathImg.toString());
          });
        }
        this.presentToast('Actualizado.');
      }).catch(err => this.presentToast('Problemas al guardar registro.'));


    }
    this.modalClose();

  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  uploadFile(value) {
    this.file = value.target.files[0];
  }

}
