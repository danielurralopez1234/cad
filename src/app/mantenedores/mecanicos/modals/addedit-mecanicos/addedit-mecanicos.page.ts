import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from '../../../../models/usuario';
import { Region } from '../../../../models/region';
import { Comuna } from '../../../../models/comuna';
import { Area } from '../../../../models/area';
import { MantenedorService } from '../../../../services/mantenedor.service';


@Component({
  selector: 'app-addedit-mecanicos',
  templateUrl: './addedit-mecanicos.page.html',
  styleUrls: ['./addedit-mecanicos.page.scss'],
})
export class AddeditMecanicosPage implements OnInit {

  usuario: Usuario = new Usuario();
  Region: any;
  Comuna: any;
  Area: any;
  key = '$key';
  comunaBusca = '';
  check: any;
  r: any;

  constructor(private modalController: ModalController, private mantService: MantenedorService,
    private toastController: ToastController) { }

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

  async modalClose() {
    await this.modalController.dismiss();
  }

  async saveMecanico() {
    this.usuario.comuna = this.check;
    console.log(this.usuario);
    // await this.mantService.saveMecanico(this.usuario).then(res => {
    //   this.presentToast('Registro exitoso.');
    //   this.modalClose();
    // }).catch(err => this.presentToast('Error al guardar registro'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
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
