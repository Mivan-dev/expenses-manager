import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioForm } from './servicio-form';

describe('ServicioForm', () => {
  let component: ServicioForm;
  let fixture: ComponentFixture<ServicioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
