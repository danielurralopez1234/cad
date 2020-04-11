import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  slides = [
    {
      img: 'assets/img/img1.png',
      titulo: 'Bienvenido a las cantinas'
    },
    {
      img: 'assets/img/img2.png',
      titulo: 'Preparate para una mejor expreriencia'
    }
    ,
    {
      img: 'assets/img/img3.png',
      titulo: 'Pide tu asistencia desde tu casa'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
