import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorFormadepagoListaPage } from './administrador-formadepago-lista.page';

describe('AdministradorFormadepagoListaPage', () => {
  let component: AdministradorFormadepagoListaPage;
  let fixture: ComponentFixture<AdministradorFormadepagoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorFormadepagoListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorFormadepagoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
