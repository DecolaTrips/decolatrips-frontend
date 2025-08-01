import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmAlta } from './em-alta';

describe('EmAlta', () => {
  let component: EmAlta;
  let fixture: ComponentFixture<EmAlta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmAlta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmAlta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
