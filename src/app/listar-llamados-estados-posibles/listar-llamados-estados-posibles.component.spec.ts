import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLlamadosEstadosPosiblesComponent } from './listar-llamados-estados-posibles.component';

describe('ListarLlamadosEstadosPosiblesComponent', () => {
  let component: ListarLlamadosEstadosPosiblesComponent;
  let fixture: ComponentFixture<ListarLlamadosEstadosPosiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLlamadosEstadosPosiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLlamadosEstadosPosiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
