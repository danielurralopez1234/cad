import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afDB: AngularFireDatabase) { }

  async saveUsers(user: User) {
    // const key = this.afDB.list('/fruits/').push(user).key;
    // fruit.id = key;
    this.afDB.database.ref('usuarios/' + user.id).set(user);

  }
  async getUser(id: string) {
     return this.afDB.object('usuarios/' + id).valueChanges();
  }
}
