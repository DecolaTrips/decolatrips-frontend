import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageForm } from './travel-package-form';

describe('TravelPackageForm', () => {
  let component: TravelPackageForm;
  let fixture: ComponentFixture<TravelPackageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPackageForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPackageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
