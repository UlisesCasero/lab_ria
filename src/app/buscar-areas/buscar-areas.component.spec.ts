import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAreasComponent } from './buscar-areas.component';

describe('BuscarAreasComponent', () => {
  let component: BuscarAreasComponent;
  let fixture: ComponentFixture<BuscarAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
