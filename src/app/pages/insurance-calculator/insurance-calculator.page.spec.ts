import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsuranceCalculatorPage } from './insurance-calculator.page';

describe('InsuranceCalculatorPage', () => {
  let component: InsuranceCalculatorPage;
  let fixture: ComponentFixture<InsuranceCalculatorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCalculatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
