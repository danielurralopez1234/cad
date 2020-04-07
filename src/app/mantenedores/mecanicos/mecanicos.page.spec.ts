import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MecanicosPage } from './mecanicos.page';

describe('MecanicosPage', () => {
  let component: MecanicosPage;
  let fixture: ComponentFixture<MecanicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MecanicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
