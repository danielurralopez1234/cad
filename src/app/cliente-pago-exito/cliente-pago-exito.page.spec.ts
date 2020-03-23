import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientePagoExitoPage } from './cliente-pago-exito.page';

describe('ClientePagoExitoPage', () => {
  let component: ClientePagoExitoPage;
  let fixture: ComponentFixture<ClientePagoExitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePagoExitoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientePagoExitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
