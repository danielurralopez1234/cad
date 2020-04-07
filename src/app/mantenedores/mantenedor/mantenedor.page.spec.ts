import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MantenedorPage } from './mantenedor.page';

describe('MantenedorPage', () => {
  let component: MantenedorPage;
  let fixture: ComponentFixture<MantenedorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
