import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MecanicoPedidosPage } from './mecanico-pedidos.page';

describe('MecanicoPedidosPage', () => {
  let component: MecanicoPedidosPage;
  let fixture: ComponentFixture<MecanicoPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanicoPedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MecanicoPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
