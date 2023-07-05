import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarResponsabilidadesComponent } from './modificar-responsabilidades.component';

describe('ModificarResponsabilidadesComponent', () => {
  let component: ModificarResponsabilidadesComponent;
  let fixture: ComponentFixture<ModificarResponsabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarResponsabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarResponsabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
