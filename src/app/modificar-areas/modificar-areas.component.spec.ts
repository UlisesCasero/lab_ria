import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAreasComponent } from './modificar-areas.component';

describe('ModificarAreasComponent', () => {
  let component: ModificarAreasComponent;
  let fixture: ComponentFixture<ModificarAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
