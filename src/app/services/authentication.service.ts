import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {Platform, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {tap} from 'rxjs/operators';
import { User } from '../models/user';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  isLoggedIn = false;
  token: any;

  constructor(
      private router: Router,
      private storage: Storage,
      private platform: Platform,
      public toastController: ToastController,
      private http: HttpClient,
      private env: EnvService,
      public afAuth: AngularFireAuth
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_UID').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }


  async onLogin(user: User) {
      return new Promise(async (resolve, rejected) => {
          await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
              resolve(res);
              const uid = res.user.uid;
              this.storage.set('USER_UID', uid).then((response) => {
                  this.authState.next(true);
              });
          }).catch(err => rejected(err));
      });
  }

  async onRegister(user: User) {
      return new Promise(async (resolve, rejected) => {
          await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
              resolve(res);
              const uid = res.user.uid;
          }).catch(err => rejected(err));
      });
  }

  login2(email: string, password: string) {
    return this.http.post(this.env.API_URL + 'auth/login',
        {email,  password}
    ).pipe(
        tap(token => {
          this.storage.set('token', token)
              .then(
                  () => {
                    console.log('Token Stored');
                  },
                  error => console.error('Error storing item', error)
              );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        }),
    );
  }

  logout() {
    this.storage.remove('USER_UID').then(() => {
      this.router.navigate(['bienvenida']);
      this.authState.next(false);
    });
  }

  logout2() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers })
        .pipe(
            tap(data => {
              this.storage.remove("token");
              this.isLoggedIn = false;
              delete this.token;
              return data;
            })
        );
  }

  register2(fName: string, lName: string, email: string, password: string) {
    return this.http.post(this.env.API_URL + 'auth/register',
        {fName, lName, email, password}
    );
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
