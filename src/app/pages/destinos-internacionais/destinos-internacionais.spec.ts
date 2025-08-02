import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosInternacionais } from './destinos-internacionais';

describe('DestinosInternacionais', () => {
  let component: DestinosInternacionais;
  let fixture: ComponentFixture<DestinosInternacionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinosInternacionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinosInternacionais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
