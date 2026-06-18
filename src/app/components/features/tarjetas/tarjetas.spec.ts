import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarjetas } from './tarjetas';

describe('Tarjetas', () => {
  let component: Tarjetas;
  let fixture: ComponentFixture<Tarjetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarjetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tarjetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
