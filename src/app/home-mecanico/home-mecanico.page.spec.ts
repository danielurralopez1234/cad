import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeMecanicoPage } from './home-mecanico.page';

describe('HomeMecanicoPage', () => {
  let component: HomeMecanicoPage;
  let fixture: ComponentFixture<HomeMecanicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMecanicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMecanicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
