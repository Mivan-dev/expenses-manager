import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaForm } from './tarjeta-form';

describe('TarjetaForm', () => {
  let component: TarjetaForm;
  let fixture: ComponentFixture<TarjetaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
