import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosNacionais } from './destinos-nacionais';

describe('DestinosNacionais', () => {
  let component: DestinosNacionais;
  let fixture: ComponentFixture<DestinosNacionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinosNacionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinosNacionais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
