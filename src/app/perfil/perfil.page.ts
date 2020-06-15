import {Component, OnInit} from '@angular/core';
import {Usuario} from '../models/usuario';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {MantenedorService} from '../services/mantenedor.service';
import {Region} from '../models/region';
import {Comuna} from '../models/comuna';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario = new Usuario();
  usuarioLst: any;
  miperfilForm: FormGroup;
  file: any;
  Region: any;
  Comuna: any;
  isRegion = true;
  uid: string;

  constructor(private authService: AuthenticationService,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private mantService: MantenedorService,
              private toastController: ToastController,
              private navCtrl: NavController) {
    this.miperfilForm = formBuilder.group({
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      apellido: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      foto: [''],
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      direccion: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
    });
  }

  async ngOnInit() {
    await this.mantService.getAllregion().snapshotChanges().subscribe(res => {
      this.Region = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        this.Region.push(a as Region);
      });
      this.Region.forEach(item => {
        if (item.id === 7) {
          this.usuario.region = item.id;
          this.selectComuna(item.id);
          return;
        }
      });
    });
    await this.authService.getSesionStorage().then(async (res) => {
      this.uid = res.id;
      (await this.usersService.getUser(res.id)).subscribe(resp => {
        this.usuarioLst = [];
        this.usuarioLst = resp;
        this.usuario.rut = this.usuarioLst.rut;
        this.usuario.nombre = this.usuarioLst.nombre;
        this.usuario.apellido = this.usuarioLst.apellido;
        this.usuario.telefono = this.usuarioLst.telefono;
        this.usuario.comuna = this.usuarioLst.comuna;
        this.usuario.direccion = this.usuarioLst.direccion;
        this.usuario.foto = this.usuarioLst.foto;
        this.formatRut();
      });
    });
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

  async updatePerfil() {
    if (this.miperfilForm.valid) {
      if (this.file !== undefined) {
        await this.mantService.upLoadImage(this.file, 'usuario/' + this.uid).then(resPathImg => {
          this.usuario.foto = resPathImg.toString();
          this.usersService.updateUsers(this.usuario, this.uid).then(resp => {
            this.presentToast('Registro exitoso.');
            this.goBack();
          }).catch(err => this.presentToast('Problemas al guardar registro.'));
        });
      } else {
        this.usuario.foto = '';
        this.usersService.updateUsers(this.usuario, this.uid).then(resp => {
          this.presentToast('Registro exitoso.');
          this.goBack();
        }).catch(err => this.presentToast('Problemas al guardar registro.'));
      }
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

  formatRut() {
    let rut = this.usuario.rut;
    if (rut.length > 0) {
      rut = this.clean(rut);
      let masc = 'XXX-Y';
      for (let i = 4; i < rut.length; i += 3) {
        masc = rut.slice(-3 - i, -i) + '.' + masc;
      }
      this.usuario.rut = masc;
    }

  }

  clean(rut) {
    return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : '';
  }

  uploadFoto(value) {
    this.file = value.target.files[0];
  }

  selectSector() {
    this.Comuna.forEach(item => {
      if (this.usuario.comuna === item.id) {
        this.usuario.sector = item.sector;
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

}
