import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { Usuario } from '../../models/usuario';
import {MantenedorService} from '../../services/mantenedor.service';
import {ToastController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  Usuario: any;
  auxUsuarios: any;
  uid: string;

  constructor(private usersService: UsersService,
              private toastController: ToastController,
              private authService: AuthenticationService) {
    authService.getSesionStorage().then(res => {
      this.uid = res.id;
    });
  }

  async ngOnInit() {
    await this.usersService.getAllUsuarios().snapshotChanges().subscribe(res => {
      this.Usuario = [];
      res.forEach(item => {
        const u = item.payload.toJSON();
        u['$key'] = item.key;
        if (this.uid !== item.key) {
          this.Usuario.push(u as Usuario);
        }
        this.auxUsuarios = this.Usuario;
      });
    });
  }

  searchUsuario(ev) {
    const val = ev.target.value;
    this.Usuario = this.auxUsuarios;
    if (val.trim() !== '') {
      this.Usuario = this.Usuario.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      });
    }
  }

  async updateUsuario(id: string, est: boolean) {
    est = !est;
    await this.usersService.updateUser(id, est).then(res => {
      this.presentToast('Actualizado.');
    }).catch(err => this.presentToast('Problemas al guardar registro.'));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
