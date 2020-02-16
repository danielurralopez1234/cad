import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorMecanicosListaPage } from './administrador-mecanicos-lista.page';

describe('AdministradorMecanicosListaPage', () => {
  let component: AdministradorMecanicosListaPage;
  let fixture: ComponentFixture<AdministradorMecanicosListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorMecanicosListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorMecanicosListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
