import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lugar',
  templateUrl: './cliente-lugar.page.html',
  styleUrls: ['./cliente-lugar.page.scss'],
})
export class ClienteLugarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  lugar(form){}

}
