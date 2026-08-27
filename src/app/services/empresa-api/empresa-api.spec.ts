import { TestBed } from '@angular/core/testing';
import { EmpresaApi } from './empresa-api';


describe('EmpresaApi', () => {
  let service: EmpresaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
