import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutosPage } from './autos.page';

describe('AutosPage', () => {
  let component: AutosPage;
  let fixture: ComponentFixture<AutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
