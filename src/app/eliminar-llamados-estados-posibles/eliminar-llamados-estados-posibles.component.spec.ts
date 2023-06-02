import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLlamadosEstadosPosiblesComponent } from './eliminar-llamados-estados-posibles.component';

describe('EliminarLlamadosEstadosPosiblesComponent', () => {
  let component: EliminarLlamadosEstadosPosiblesComponent;
  let fixture: ComponentFixture<EliminarLlamadosEstadosPosiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarLlamadosEstadosPosiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarLlamadosEstadosPosiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
