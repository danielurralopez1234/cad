import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteAgendaMantencionPage } from './cliente-agenda-mantencion.page';

describe('ClienteAgendaMantencionPage', () => {
  let component: ClienteAgendaMantencionPage;
  let fixture: ComponentFixture<ClienteAgendaMantencionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAgendaMantencionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteAgendaMantencionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
