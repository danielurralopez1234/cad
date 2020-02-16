import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorServiciosListaPage } from './administrador-servicios-lista.page';

describe('AdministradorServiciosListaPage', () => {
  let component: AdministradorServiciosListaPage;
  let fixture: ComponentFixture<AdministradorServiciosListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorServiciosListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorServiciosListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
