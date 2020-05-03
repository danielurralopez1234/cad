import {Component, OnInit} from '@angular/core';
import {Usuario} from '../models/usuario';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario = new Usuario();
  usuarioLst: any;
  miperfilForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private usersService: UsersService,
              private formBuilder: FormBuilder) {
    this.miperfilForm = formBuilder.group({
      nombre: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      apellido: ['', Validators.compose([Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
    });
  }

  async ngOnInit() {
    await this.authService.getSesionStorage().then(async (res) => {
      (await this.usersService.getUser(res.id)).subscribe(resp => {
        this.usuarioLst = [];
        this.usuarioLst = resp;
        this.usuario.rut = this.usuarioLst.rut;
        this.usuario.nombre = this.usuarioLst.nombre;
        this.usuario.apellido = this.usuarioLst.apellido;
        this.usuario.telefono = this.usuarioLst.telefono;
        this.formatRut();
      });
    });
  }

  updatePerfil() {

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

}
