import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from '../../../../models/usuario';
import { Region } from '../../../../models/region';
import { Comuna } from '../../../../models/comuna';
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
  key = '$key';
  comunaBusca = '';

  constructor(private modalController: ModalController, private mantService: MantenedorService,
              private toastController: ToastController) {}

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
    await this.mantService.saveMecanico(this.usuario).then(res => {
      this.presentToast('Registro exitoso.');
      this.modalClose();
    }).catch(err => this.presentToast('Error al guardar registro'));
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

}
