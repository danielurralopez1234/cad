import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Aceite} from '../models/aceite';

@Injectable({
  providedIn: 'root'
})
export class MantenedorService {
  ref: any;
  aceiteListRef: AngularFireList<any>;
  constructor(private afDB: AngularFireDatabase) {
    this.ref = afDB.database.ref('aceite');
  }

  async saveAceite(aceite: Aceite) {
    // this.afDB.database.ref('aceite').push().set(aceite);
    this.ref.push().set(aceite);
  }

  getAllAceite() {
    this.aceiteListRef = this.afDB.list('aceite');
    return this.aceiteListRef;
  }
}
