import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MecanicoInicioPage } from './mecanico-inicio.page';

describe('MecanicoInicioPage', () => {
  let component: MecanicoInicioPage;
  let fixture: ComponentFixture<MecanicoInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanicoInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MecanicoInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
