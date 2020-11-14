import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
