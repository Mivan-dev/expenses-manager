import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDropdown } from './empresa-dropdown';

describe('EmpresaDropdown', () => {
  let component: EmpresaDropdown;
  let fixture: ComponentFixture<EmpresaDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
