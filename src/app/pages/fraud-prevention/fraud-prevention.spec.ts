import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudPrevention } from './fraud-prevention';

describe('FraudPrevention', () => {
  let component: FraudPrevention;
  let fixture: ComponentFixture<FraudPrevention>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraudPrevention]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraudPrevention);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
