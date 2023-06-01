import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarLlamadosEstadosPosiblesComponent } from './buscar-llamados-estados-posibles.component';

describe('BuscarLlamadosEstadosPosiblesComponent', () => {
  let component: BuscarLlamadosEstadosPosiblesComponent;
  let fixture: ComponentFixture<BuscarLlamadosEstadosPosiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarLlamadosEstadosPosiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarLlamadosEstadosPosiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
