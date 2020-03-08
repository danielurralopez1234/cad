import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteInicioPage } from './cliente-inicio.page';

describe('ClienteInicioPage', () => {
  let component: ClienteInicioPage;
  let fixture: ComponentFixture<ClienteInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
