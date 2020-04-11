import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Aceite} from '../models/aceite';
import {FormaPago} from '../models/formaPago';

@Injectable({
  providedIn: 'root'
})
export class MantenedorService {
  aceiteBD: any;
  formaPago: any;
  aceiteListRef: AngularFireList<any>;
  formaPagoListRef: AngularFireList<any>;

  constructor(private afDB: AngularFireDatabase) {
    this.aceiteBD = afDB.database.ref('aceite');
    this.formaPago = afDB.database.ref('formaPago');
  }

  async saveAceite(aceite: Aceite) {
    this.aceiteBD.push().set(aceite);
  }

  getAllAceite() {
    this.aceiteListRef = this.afDB.list('aceite');
    return this.aceiteListRef;
  }

  async updateAceite(id: string, est: boolean) {
    this.afDB.database.ref('aceite/' + id).update({estado: est});
  }

  async saveFormaPago(formaPago: FormaPago) {
    this.formaPago.push().set(formaPago);
  }

  getAllformaPago() {
    this.formaPagoListRef = this.afDB.list('formaPago');
    return this.formaPagoListRef;
  }
}
