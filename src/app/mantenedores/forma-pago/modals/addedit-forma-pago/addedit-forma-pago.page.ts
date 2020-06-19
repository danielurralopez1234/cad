import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import { FormaPago } from '../../../../models/formaPago';
import { MantenedorService } from '../../../../services/mantenedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addedit-forma-pago',
  templateUrl: './addedit-forma-pago.page.html',
  styleUrls: ['./addedit-forma-pago.page.scss'],
})
export class AddeditFormaPagoPage implements OnInit {
  formaPago: FormaPago = new FormaPago();
  auxParam: any = [];
  id: string;
  formaPagoForm: FormGroup;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController) {
    this.formaPagoForm = formBuilder.group({
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      comentario: ['', Validators.compose([Validators.required])]
    });
  }

  async ngOnInit() {
    if (this.navParams.get('data') !== null) {
      await this.presentLoading();
      this.auxParam.push(this.navParams.get('data') as FormaPago);
      this.auxParam.forEach(item => {
        this.formaPago.comentario = item[0].comentario;
        this.formaPago.nombre = item[0].nombre;
        this.id = item[0].$key;
      });
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveUpdateFormaPago() {
    if (this.formaPagoForm.valid) {
      if (this.auxParam.length === 0) {
        this.formaPago.estado = false;
        await this.mantService.saveFormaPago(this.formaPago).then(async resId => {
          console.log('id formaPago: ' + resId);
          this.presentToast('Registro exitoso.');
        }).catch(err => this.presentToast('Error al guardar registro'));
      } else {
        await this.mantService.updateFormaPagoPop(this.id, this.formaPago).then(async res => {
          this.presentToast('Actualizado.');
        }).catch(err => this.presentToast('Problemas al guardar registro.'));


      }
      this.modalClose();
    } else {
      this.presentAlert();
    }

  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Formulario',
      message: 'Faltan campos que llenar.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
