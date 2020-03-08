import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientePagoPage } from './cliente-pago.page';

describe('ClientePagoPage', () => {
  let component: ClientePagoPage;
  let fixture: ComponentFixture<ClientePagoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePagoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientePagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
