import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosVtos } from './proximos-vtos';

describe('ProximosVtos', () => {
  let component: ProximosVtos;
  let fixture: ComponentFixture<ProximosVtos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximosVtos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximosVtos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
