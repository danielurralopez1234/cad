import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  userRes: any = [];

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private userService: UsersService) { }

  async ngOnInit() {
    const idUsuario = this.navParams.get('UID');
    await this.userService.getUser(idUsuario).then(resp => {
      resp.subscribe(snap => {
        this.userRes = snap;
      });
    });
  }

  async modalClose() {
    await this.modalController.dismiss();
  }

}
