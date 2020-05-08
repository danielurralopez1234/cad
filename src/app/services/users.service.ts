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
  async getUser(id: string) {
     return this.afDB.object('usuario/' + id).valueChanges();
  }
}
