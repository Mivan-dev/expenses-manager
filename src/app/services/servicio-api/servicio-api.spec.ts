import { TestBed } from '@angular/core/testing';

import { ServicioApi } from './servicio-api';

describe('ServicioApi', () => {
  let service: ServicioApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
