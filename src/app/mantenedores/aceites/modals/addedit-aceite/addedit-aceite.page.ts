import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {Aceite} from '../../../../models/aceite';
import {MantenedorService} from '../../../../services/mantenedor.service';
import {TipoCombustible} from '../../../../models/tipoCombustible';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  TipoCom: any;
  aceiteForm: FormGroup;

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    if (navParams.get('data') !== null) {
      this.auxParam.push(navParams.get('data') as Aceite);
      this.auxParam.forEach(item => {
        this.aceite.tipoCom = item[0].tipoCom;
        this.aceite.nombre = item[0].nombre;
        this.aceite.descripcion = item[0].descripcion;
        this.aceite.valor = item[0].valor;
        this.aceite.foto = item[0].foto;
        this.aceite.estado = item[0].estado;
        this.id = item[0].$key;
      });
    }
    this.aceiteForm = formBuilder.group({
      tipo: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      descripcion: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      precio: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9]*'), Validators.required])],
      foto: ['', Validators.compose([Validators.required])],

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

  async saveUpdateAceite() {
    if (this.aceiteForm.valid) {
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

  uploadFile(value) {
    this.file = value.target.files[0];
  }

}
