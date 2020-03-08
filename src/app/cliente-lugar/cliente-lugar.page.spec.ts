import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteLugarPage } from './cliente-lugar.page';

describe('ClienteLugarPage', () => {
  let component: ClienteLugarPage;
  let fixture: ComponentFixture<ClienteLugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteLugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteLugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
