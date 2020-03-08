import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteMisServiciosPage } from './cliente-mis-servicios.page';

describe('ClienteMisServiciosPage', () => {
  let component: ClienteMisServiciosPage;
  let fixture: ComponentFixture<ClienteMisServiciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteMisServiciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteMisServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
