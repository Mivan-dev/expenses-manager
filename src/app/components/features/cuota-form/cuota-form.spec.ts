import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaForm } from './cuota-form';

describe('CuotaForm', () => {
  let component: CuotaForm;
  let fixture: ComponentFixture<CuotaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuotaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuotaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
