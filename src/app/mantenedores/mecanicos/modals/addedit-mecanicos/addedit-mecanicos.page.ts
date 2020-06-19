import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import { Usuario } from '../../../../models/usuario';
import { Region } from '../../../../models/region';
import { Comuna } from '../../../../models/comuna';
import { Area } from '../../../../models/area';
import { MantenedorService } from '../../../../services/mantenedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../../../../services/users.service';


@Component({
  selector: 'app-addedit-mecanicos',
  templateUrl: './addedit-mecanicos.page.html',
  styleUrls: ['./addedit-mecanicos.page.scss'],
})
export class AddeditMecanicosPage implements OnInit {

  usuario: Usuario = new Usuario();
  auxParam: any = [];
  id: string;
  Region: any;
  Comuna: any;
  area: any;
  key = '$key';
  check: any;
  r: any;
  file: any;
  mecanicoForm: FormGroup;
  isRegion = true;
  isRut = true;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private userService: UsersService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController) {
    this.mecanicoForm = formBuilder.group({
      rut: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.pattern('[0-9kK.-]*'), Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      mail: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])]

    });
  }

  async ngOnInit() {
   await this.mantService.getAllregion().snapshotChanges().subscribe(res => {
      this.Region = [];
      res.forEach(item => {
        const r = item.payload.toJSON();
        r[this.key] = item.key;
        if (r['id'] === 7) {
          this.usuario.region = r['id'];
          this.selectComuna(r['id']);
        }
        this.Region.push(r as Region);
      });
    });
   if (this.navParams.get('data') !== null) {
      await this.presentLoading();
      this.auxParam.push(this.navParams.get('data') as Usuario);
      this.auxParam.forEach(item => {
        this.usuario.rut = item[0].rut;
        this.usuario.nombre = item[0].nombre;
        this.usuario.apellido = item[0].apellido;
        this.usuario.email = item[0].email;
        this.usuario.telefono = item[0].telefono;
        this.usuario.comuna = item[0].comuna;
        if (this.usuario.comuna.length > 0) {
          this.selectComuna(Number(this.usuario.comuna));
        }
        this.id = item[0].$key;
      });
    } else {
     this.isRut = false;
   }
  }
  async selectComuna(id: number) {
    this.usuario.comuna = '';
    const comuna = await this.mantService.getComunaByRegion(id);
    this.Comuna = [];
    comuna.on('child_added', (snapshot) => {
      const a = snapshot.val();
      this.Comuna.push(a as Comuna);
    });
  }
  async selectArea() {
    let idArea;
    this.Comuna.forEach(r => {
      if (r.id === this.usuario.comuna) {
        idArea = r.sector;
      }
    });
    await this.mantService.getAllarea().snapshotChanges().subscribe(resp => {
      this.area = '';
      resp.forEach(item => {
        const r = item.payload.toJSON();
        if (r['id'] === idArea) {
          this.area = r['nombre'];
          this.usuario.sector = r['id'];
        }
      });
    });
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
  async saveUpdateUsuario() {
    if (this.mecanicoForm.valid) {
      this.usuario.rol = 2;
      await this.userService.updateUserMecanico(this.usuario, this.id).then(async res => {
        this.presentToast('Actualizado.');
      }).catch(err => {this.presentToast('Problemas al guardar registro.'); console.log(err); });

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

  async formatRut() {
    if (this.mecanicoForm.get('rut').value !== undefined) {
      await this.userService.getUsuarioByRut(this.mecanicoForm.get('rut').value).then(async resp => {
        this.id = resp.key;
        this.usuario.nombre = resp.val().nombre;
        this.usuario.apellido = resp.val().apellido;
        this.usuario.email = resp.val().email;
        this.usuario.telefono = resp.val().telefono;
        this.usuario.comuna = resp.val().comuna;
        if (this.usuario.comuna !== undefined && this.usuario.comuna.length > 0) {
          this.selectComuna(Number(this.usuario.comuna));
        }
      });

      let rut = this.mecanicoForm.get('rut').value;

      if (rut.length > 0) {
        rut = this.clean(rut);

        let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
        for (let i = 4; i < rut.length; i += 3) {
          result = rut.slice(-3 - i, -i) + '.' + result;
        }
        this.mecanicoForm.controls['rut'].setValue(result);
      } else {
        this.mecanicoForm.controls['rut'].setValue(rut);
      }
    }
  }

  clean(rut) {
    return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : '';
  }

}
