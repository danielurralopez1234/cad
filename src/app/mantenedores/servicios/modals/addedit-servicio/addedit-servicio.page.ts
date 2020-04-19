import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Servicio } from '../../../../models/servicio';
import { MantenedorService } from '../../../../services/mantenedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addedit-servicio',
  templateUrl: './addedit-servicio.page.html',
  styleUrls: ['./addedit-servicio.page.scss'],
})
export class AddeditServicioPage implements OnInit {
  servicio: Servicio = new Servicio();
  auxParam: any = [];
  id: string;
  servicioForm: FormGroup;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    if (navParams.get('data') !== null) {
      this.auxParam.push(navParams.get('data') as Servicio);
      this.auxParam.forEach(item => {
        this.servicio.nombre = item[0].nombre;
        this.servicio.valor = item[0].valor;
        this.servicio.descripcion = item[0].descripcion;
        this.id = item[0].$key;
      });
    }
    this.servicioForm = formBuilder.group({
      valor: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9]*'), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      descripcion: ['', Validators.compose([Validators.max(300), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
    });
  }

  ngOnInit() { }

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveUpdateServicio() {
    if (this.servicioForm.valid) {
      if (this.auxParam.length === 0) {
        this.servicio.estado = false;
        await this.mantService.saveServicio(this.servicio).then(async resId => {
          console.log('id servicio: ' + resId);
          this.presentToast('Registro exitoso.');
        }).catch(err => this.presentToast('Error al guardar registro'));
      } else {
        await this.mantService.updateServicioPop(this.id, this.servicio).then(async res => {
          this.presentToast('Actualizado.');
        }).catch(err => this.presentToast('Problemas al guardar registro.'));


      }
      this.modalClose();
    } else {
      this.presentAlert();
    }

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Formulario',
      message: 'Faltan campos que llenar.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
