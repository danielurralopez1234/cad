import { Component, OnInit } from '@angular/core';
import {MisAutos} from '../models/misAutos';
import {MantenedorService} from '../services/mantenedor.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-misautos',
  templateUrl: './misautos.page.html',
  styleUrls: ['./misautos.page.scss'],
})
export class MisautosPage implements OnInit {
  MisAutos: any;

  constructor(private mantService: MantenedorService,
              private authService: AuthenticationService) {  }

  async ngOnInit() {
    await this.authService.getSesionStorage().then(resp => {
      if (resp.id !== undefined && resp.id !== null) {
        const misautos = this.mantService.getMisAutosByIdUsuario(resp.id);
        this.MisAutos = [];
        misautos.once('value', snap => {
          snap.forEach(it => {
            const a = it.val();
            a['$key'] = it.key;
            this.mantService.getMarcaById(a.marca).subscribe(marca => {
              a['nomMarca'] = marca['nombre'];
            });
            this.mantService.getModeloById(a.modelo).subscribe(modelo => {
              a['nomModelo'] = modelo['nombre'];
            });
            this.MisAutos.push(a as MisAutos);
          });
        });
      }
    });
  }

}
