import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredencialForm } from './credencial-form';

describe('CredencialForm', () => {
  let component: CredencialForm;
  let fixture: ComponentFixture<CredencialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredencialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredencialForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
