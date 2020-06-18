import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {MisAutos} from '../../models/misAutos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MantenedorService} from '../../services/mantenedor.service';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';

@Component({
  selector: 'app-edit-misautos',
  templateUrl: './edit-misautos.page.html',
  styleUrls: ['./edit-misautos.page.scss'],
})
export class EditMisautosPage implements OnInit {
  misAutos: MisAutos = new MisAutos();
  misAutosForm: FormGroup;
  anio: any;
  Modelo: any;
  Marca: any;
  id: string;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private mantService: MantenedorService,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController) {
    this.misAutosForm = formBuilder.group({
      patente: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      anio: ['', Validators.compose([Validators.required])],
      cilindrada: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[0-9.]*'), Validators.required])]

    });
  }

  async ngOnInit() {
    await this.mantService.getAllMarca().snapshotChanges().subscribe(res => {
      this.Marca = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Marca.push(a as Marca);
      });
    });
    await this.presentLoading(1500);
    this.misAutos.marca = this.navParams.get('MARCA');
    this.misAutos.patente = this.navParams.get('PATENTE');
    this.misAutos.anio = this.navParams.get('ANIO');
    this.misAutos.cilindrada = this.navParams.get('CILINDRADA');
    this.id = this.navParams.get('ID');
    this.anio = this.misAutos.anio + 1;

  }

  async modalClose() {
    await this.modalController.dismiss();
  }

  async updateMisAutos() {
    if (this.misAutosForm.valid) {
      await this.mantService.updateMisAutosPop(this.id, this.misAutos).then(async res => {
        this.presentToast('Actualizado.');
      }).catch(err => this.presentToast('Problemas al guardar registro.'));
      this.modalClose();
    } else {
      this.presentAlert();
    }

  }

  parseDate() {
    const anio = new Date(this.anio);
    this.misAutos.anio = anio.getUTCFullYear() - 1;
  }

  async selectModel(evt: any) {
    this.misAutos.modelo = '';
    const modelo = await this.mantService.getModeloByMarca(Number(evt.target.value));
    this.Modelo = [];
    modelo.on('child_added', (snapshot) => {
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.Modelo.push(a as Modelo);
    });
    await this.presentLoading(1000);
    this.misAutos.modelo = this.navParams.get('MODELO');
  }

  async presentLoading(duracion: number) {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
      duration: duracion
    });
    await loading.present();
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
