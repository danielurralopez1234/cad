import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Modelo} from '../../../models/modelo';
import {MantenedorService} from '../../../services/mantenedor.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.page.html',
  styleUrls: ['./modelo.page.scss'],
})
export class ModeloPage implements OnInit {
  key: string;
  Modelo: any;

  constructor(private activatedRoute: ActivatedRoute,
              private mantService: MantenedorService,
              private loadingController: LoadingController) {
    this.key = activatedRoute.snapshot.paramMap.get('id');
    console.log(this.key);
  }

  async ngOnInit() {
    this.Modelo = [];
    await this.mantService.getModeloByMarca(Number(this.key)).on('child_added', (snapshot) => {
      const a = snapshot.val();
      a['$key'] = snapshot.key;
      this.Modelo.push(a as Modelo);
      console.log(this.Modelo);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
  }

}
