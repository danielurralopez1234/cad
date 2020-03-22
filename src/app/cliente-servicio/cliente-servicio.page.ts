import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-servicio',
  templateUrl: './cliente-servicio.page.html',
  styleUrls: ['./cliente-servicio.page.scss'],
})
export class ClienteServicioPage implements OnInit {

  topStories: any;
  constructor(private router: Router) { 
    this.topStories = [
      {title: "Exploring San Francisco", author: "Rea Ramsey", body: "", picture: "https://picsum.photos/500/400?image=693"},
      {title: "Coffee the right way", author: "Ellesha Hartley", body: "", picture: "https://picsum.photos/500/400?image=1060"},
      {title: "Best Hiking In Yosemite", author: "Vinnie Alexander", body: "", picture: "https://picsum.photos/500/400?image=1043"},
      {title: "Astro Photography Guide", author: "Greg Rakozy", body: "", picture: "https://picsum.photos/500/400?image=903"}
    ]
  }

  ngOnInit() {
  }
  servicio(form){
    // this.router.navigate(['/cliente-lugar']);
  }

}
