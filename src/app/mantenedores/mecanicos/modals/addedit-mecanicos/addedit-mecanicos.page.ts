import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Usuario } from '../../../../models/usuario';
import { Region } from '../../../../models/region';
import { Comuna } from '../../../../models/comuna';
import { Area } from '../../../../models/area';
import { MantenedorService } from '../../../../services/mantenedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  Area: any;
  key = '$key';
  comunaBusca = '';
  check: any;
  r: any;
  file: any;
  TipoCom: any;
  mecanicoForm: FormGroup;

  constructor(private modalController: ModalController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    if (navParams.get('data') !== null) {
      this.auxParam.push(navParams.get('data') as Usuario);
      this.auxParam.forEach(item => {
        this.usuario.rut = item[0].rut;
        this.usuario.dv = item[0].dv;
        this.usuario.nombre = item[0].nombre;
        this.usuario.apellidoPaterno = item[0].apellidoPaterno;
        this.usuario.apellidoMaterno = item[0].apellidoMaterno;
        this.usuario.fechaNacimiento = item[0].fechaNacimiento;
        this.usuario.mail = item[0].mail;
        this.usuario.contrasena = item[0].contrasena;
        this.usuario.direccion = item[0].direccion;
        this.usuario.telefono = item[0].telefono;
        this.usuario.region = item[0].region;
        this.usuario.comuna = item[0].comuna;
        this.usuario.area = item[0].area;
        this.usuario.foto = item[0].foto;
        this.id = item[0].$key;
      });
    }
    this.mecanicoForm = formBuilder.group({
      rut: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      dv: ['', Validators.compose([Validators.maxLength(1), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      apellidoPaterno: ['', Validators.compose([Validators.required])],
      apellidoMaterno: ['', Validators.compose([Validators.required])],
      fechaNacimiento: ['', Validators.compose([Validators.required])],
      mail: ['', Validators.compose([Validators.required])],
      contrasena: ['', Validators.compose([Validators.required])],
      direccion: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])],
      foto: ['', Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
    const regionRes = this.mantService.getAllregion();
    regionRes.snapshotChanges().subscribe(res => {
      this.Region = [];
      res.forEach(item => {
        const r = item.payload.toJSON();
        r[this.key] = item.key;
        if (item.key === 'Región Metropolitana de Santiago') {
          this.Region.push(r as Region);
        }
      });
    });
  }

  async saveUpdateUsuario() {
    if (this.mecanicoForm.valid) {
      if (this.auxParam.length === 0) {
        this.usuario.estado = false;
        this.usuario.rol = 2;
        await this.mantService.saveUsuario(this.usuario).then(async resId => {
          console.log('id usuario: ' + resId);
          await this.mantService.upLoadImage(this.file, resId.toString()).then(resPathImg => {
            console.log('path img: ' + resPathImg);
            this.mantService.updateUsuarioFoto(resId.toString(), resPathImg.toString());
          });
          this.presentToast('Registro exitoso.');
        }).catch(err => this.presentToast('Error al guardar registro'));
      } else {
        await this.mantService.updateUsuarioPop(this.id, this.usuario).then(async res => {
          if (this.file !== undefined) {
            await this.mantService.upLoadImage(this.file, this.id).then(resPathImg => {
              console.log('path img update: ' + resPathImg);
              this.mantService.updateUsuarioFoto(this.id, resPathImg.toString());
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

  async modalClose() {
    await this.modalController.dismiss();
  }


  async searchComuna(comuna) {
    const val = [];
    val.push(comuna.data);

    const comunanRes = this.mantService.getAllcomuna();

    for (const j of val) {
      if (j === null) {
        this.comunaBusca = '';
      } else {
        this.comunaBusca = this.comunaBusca + j;
      }
    }

    comunanRes.snapshotChanges().subscribe(res => {
      this.Comuna = [];
      res.forEach(item => {
        const c = item.payload.toJSON();
        const j = c as Comuna;
        if (this.min(j.nombre).indexOf(this.min(this.comunaBusca)) > -1) {
          this.Comuna.push(c as Comuna);
        }
      });
    });
  }

  min(value) {
    if (value !== '' || value !== null || value !== 'undefinide') {
      return value.toString().toLowerCase();
    }
  }
  checkValue(value) {
    this.check = value.detail.value;

    const m = this.buscaComuna(this.check);
    const areasRes = this.mantService.getAllarea();
    areasRes.snapshotChanges().subscribe(res => {
      this.Area = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        const j = a as Area;
        if (j.id === m.sector) {
          this.Area.push(a as Area);
        }
      });
    });
  }

  buscaComuna(val) {
    for (const j of this.Comuna) {
      if (j.id === parseInt(val)) {
        return j;
      }
    }
  }



}
