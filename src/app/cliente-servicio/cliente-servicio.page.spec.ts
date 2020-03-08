import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteServicioPage } from './cliente-servicio.page';

describe('ClienteServicioPage', () => {
  let component: ClienteServicioPage;
  let fixture: ComponentFixture<ClienteServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteServicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
