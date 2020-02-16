import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorAceitesListaPage } from './administrador-aceites-lista.page';

describe('AdministradorAceitesListaPage', () => {
  let component: AdministradorAceitesListaPage;
  let fixture: ComponentFixture<AdministradorAceitesListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorAceitesListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorAceitesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
