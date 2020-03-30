import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {LoadingController, Platform} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {tap} from 'rxjs/operators';
import {User} from '../models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsersService} from './users.service';
import {UserStorage} from '../models/userStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  isLoggedIn = false;
  token: any;
  userRes: any = [];
  usrData: UserStorage = new UserStorage();

  constructor(
      private router: Router,
      private storage: Storage,
      private platform: Platform,
      private http: HttpClient,
      private env: EnvService,
      public afAuth: AngularFireAuth,
      private usersService: UsersService,
      public loadingCtrl: LoadingController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_DATA').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  getSesionStorage() {
      return this.storage.get('USER_DATA');
  }


  onLogin(user: User) {
      return new Promise(async (resolve, rejected) => {
         await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(async res => {
              console.log('1');
              const uid = res.user.uid;
              await this.usersService.getUser(uid).subscribe(usr => {
                  console.log('2');
                  this.userRes = usr;
                  this.usrData.id = this.userRes.id;
                  this.usrData.nombre = this.userRes.nombre;
                  this.usrData.rol = this.userRes.rol;
                  this.storage.set('USER_DATA', this.usrData).then(async (response) => {
                      this.authState.next(true);
                  });
                  console.log('3');
              });
              console.log('4');
              resolve(res);

              // let usuario: User = new User();
              // this.userRes = this.usersService.getUser(uid);
              // console.log(usuario.nombre);
              /*
              this.storage.set('USER_DATA', data).then((response) => {
                  this.authState.next(true);
              });

               */

          }).catch(err => rejected(err));
      });
  }

  async onRegister(user: User) {
      return new Promise(async (resolve, rejected) => {
          await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(async res => {
              user.id = res.user.uid;
              user.rol = 1;
              await this.usersService.saveUsers(user);
              resolve(res);
          }).catch(err => rejected(err));
      });
  }

   async presentLoading() {
       const loading = await this.loadingCtrl.create({
           message: 'Porfavor espere...',
           duration: 5000
       });
       await loading.present();
       const { role, data } = await loading.onDidDismiss();
       console.log('Loading dismissed!');
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
    this.storage.remove('USER_DATA').then(() => {
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
