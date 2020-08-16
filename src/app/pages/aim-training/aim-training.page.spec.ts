import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AimTrainingPage } from './aim-training.page';

describe('AimTrainingPage', () => {
  let component: AimTrainingPage;
  let fixture: ComponentFixture<AimTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimTrainingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AimTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
