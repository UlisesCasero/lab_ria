import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLlamadosEstadosPosiblesComponent } from './modificar-llamados-estados-posibles.component';

describe('ModificarLlamadosEstadosPosiblesComponent', () => {
  let component: ModificarLlamadosEstadosPosiblesComponent;
  let fixture: ComponentFixture<ModificarLlamadosEstadosPosiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLlamadosEstadosPosiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLlamadosEstadosPosiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
