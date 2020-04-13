import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Aceite } from '../models/aceite';
import { FormaPago } from '../models/formaPago';
import { Servicio } from '../models/servicio';
import { Auto } from '../models/auto';
import { Usuario } from '../models/usuario';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { convertToParamMap } from '@angular/router';
import { storage } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MantenedorService {
  storageRef: any;

  aceite: any;
  formaPago: any;
  servicio: any;
  auto: any;
  usuario: any;

  aceiteListRef: AngularFireList<any>;
  formaPagoListRef: AngularFireList<any>;
  servicioListRef: AngularFireList<any>;
  autoListRef: AngularFireList<any>;
  usuarioListRef: AngularFireList<any>;
  comunaListRef: AngularFireList<any>;
  regionListRef: AngularFireList<any>;


  constructor(private afDB: AngularFireDatabase) {
    this.storageRef = afDB.database.ref();

    this.aceite = afDB.database.ref('aceite');
    this.formaPago = afDB.database.ref('formaPago');
    this.servicio = afDB.database.ref('servicio');
    this.auto = afDB.database.ref('auto');
    this.usuario = afDB.database.ref('usuario');




  }

  async saveAceite(aceite: Aceite) {
    this.aceite.push().set(aceite);
  }

  getAllAceite() {
    return this.afDB.list('aceite');
  }

  async saveFormaPago(formaPago: FormaPago) {
    this.formaPago.push().set(formaPago);
  }

  getAllformaPago() {
    return this.afDB.list('formaPago');
  }

  async saveServicio(servicio: Servicio) {
    this.servicio.push().set(servicio);
  }

  getAllservicio() {
    return this.afDB.list('servicio');
  }

  async saveAuto(auto: Auto) {
    this.auto.push().set(auto);
  }

  getAllauto() {
    return this.afDB.list('auto');
  }

  async saveMecanico(usuario: Usuario) {
    usuario.rol = 2;
    this.usuario.push().set(usuario);
  }

  getAllmecanico() {
    return this.afDB.list('usuario');
  }

  getAllregion() {
    return this.afDB.list('region');
  }

  getAllcomuna() {
    return this.afDB.list('comuna');
  }

  getAllarea() {
    return this.afDB.list('sector');
  }

  async upLoadImage(img: any, id: string) {
    this.storageRef = storage().ref('img/' + id);
    const task = this.storageRef.put(img);
  }

  getImageById(id: string) {
    return storage().ref('img/' + id).getDownloadURL();
  }

}
