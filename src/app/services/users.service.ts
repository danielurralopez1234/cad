import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afDB: AngularFireDatabase) { }

  async saveUsers(user: Usuario, uid: string) {
    this.afDB.database.ref('usuario/' + uid).set(user);

  }
  async updateUsers(user: Usuario, uid: string) {
    this.afDB.database.ref('usuario/' + uid).update({
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      region: user.region,
      comuna: user.comuna,
      direccion: user.direccion,
      sector: user.sector,
      foto: user.foto});

  }
  async updateUserMecanico(user: Usuario, uid: string) {
    this.afDB.database.ref('usuario/' + uid).update({
      rut: user.rut,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      region: user.region,
      comuna: user.comuna,
      sector: user.sector,
      rol: user.rol});

  }
  async updateUser(id: string, est: boolean) {
    this.afDB.database.ref('usuario/' + id).update({ estado: est });
  }
  async updateMecanicoUser(role: number, uid: string) {
    this.afDB.database.ref('usuario/' + uid).update({
      rol: role});
  }
  async getUser(id: string) {
     return this.afDB.object('usuario/' + id).valueChanges();
  }
  getAllUsuarios() {
    return this.afDB.list('usuario/');
  }
  getUsuarioByRut(rut: string) {
    return this.afDB.database.ref('usuario').
    orderByChild('rut').equalTo(rut).once('child_added');
  }
}
