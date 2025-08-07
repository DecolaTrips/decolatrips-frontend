import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erro404 } from './erro404';

describe('Erro404', () => {
  let component: Erro404;
  let fixture: ComponentFixture<Erro404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erro404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erro404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
