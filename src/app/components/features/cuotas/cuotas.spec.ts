import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuotas } from './cuotas';

describe('Cuotas', () => {
  let component: Cuotas;
  let fixture: ComponentFixture<Cuotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuotas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
