import { TestBed } from '@angular/core/testing';

import { TarjetaApi } from './tarjeta-api';

describe('TarjetaApi', () => {
  let service: TarjetaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
