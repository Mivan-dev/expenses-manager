import { TestBed } from '@angular/core/testing';

import { ThemeTs } from './theme.ts';

describe('ThemeTs', () => {
  let service: ThemeTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
