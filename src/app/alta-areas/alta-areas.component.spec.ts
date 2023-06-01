import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAreasComponent } from './alta-areas.component';

describe('AltaAreasComponent', () => {
  let component: AltaAreasComponent;
  let fixture: ComponentFixture<AltaAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
