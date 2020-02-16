import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorFormadepagoPage } from './administrador-formadepago.page';

describe('AdministradorFormadepagoPage', () => {
  let component: AdministradorFormadepagoPage;
  let fixture: ComponentFixture<AdministradorFormadepagoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorFormadepagoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorFormadepagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
