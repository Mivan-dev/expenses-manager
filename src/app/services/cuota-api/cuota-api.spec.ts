import { TestBed } from '@angular/core/testing';

import { CuotaApi } from './cuota-api';

describe('CuotaApi', () => {
  let service: CuotaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuotaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
