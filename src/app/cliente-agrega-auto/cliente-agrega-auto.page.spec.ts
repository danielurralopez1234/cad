import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteAgregaAutoPage } from './cliente-agrega-auto.page';

describe('ClienteAgregaAutoPage', () => {
  let component: ClienteAgregaAutoPage;
  let fixture: ComponentFixture<ClienteAgregaAutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAgregaAutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteAgregaAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
