import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.page.html',
  styleUrls: ['./cliente-inicio.page.scss'],
})
export class ClienteInicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  inicio(form){
    this.router.navigate(['/cliente-servicio']);
  }
}
