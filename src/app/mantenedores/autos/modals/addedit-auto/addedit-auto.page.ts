import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Auto } from '../../../../models/auto';
import { TipoCombustible } from '../../../../models/tipoCombustible';
import { MantenedorService } from '../../../../services/mantenedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addedit-auto',
  templateUrl: './addedit-auto.page.html',
  styleUrls: ['./addedit-auto.page.scss'],
})
export class AddeditAutoPage implements OnInit {
  auto: Auto = new Auto();
  auxParam: any = [];
  id: string;
  autoForm: FormGroup;
  TipoCom: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    if (navParams.get('data') !== null) {
      this.auxParam.push(navParams.get('data') as Auto);
      this.auxParam.forEach(item => {
        this.auto.anio = item[0].anio;
        this.auto.marca = item[0].marca;
        this.auto.modelo = item[0].modelo;
        this.auto.combustible = item[0].combustible;
        this.auto.patente = item[0].patente;
        this.auto.estado = item[0].estado;
        this.id = item[0].$key;
      });
    }
    this.autoForm = formBuilder.group({
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      patente: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      anio: ['', Validators.compose([Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  ngOnInit() { 
    const tipoComRes = this.mantService.getAllTipoCombustible();
    tipoComRes.snapshotChanges().subscribe(res => {
      this.TipoCom = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.TipoCom.push(a as TipoCombustible);
      });
    });
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveUpdateAuto() {
    if (this.autoForm.valid) {
      if (this.auxParam.length === 0) {
        this.auto.estado = false;
        await this.mantService.saveAuto(this.auto).then(async resId => {
          console.log('id auto: ' + resId);
          this.presentToast('Registro exitoso.');
        }).catch(err => this.presentToast('Error al guardar registro'));
      } else {
        await this.mantService.updateAutoPop(this.id, this.auto).then(async res => {
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
