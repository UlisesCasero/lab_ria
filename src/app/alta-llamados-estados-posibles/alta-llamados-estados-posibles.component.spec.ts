import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLlamadosEstadosPosiblesComponent } from './alta-llamados-estados-posibles.component';

describe('AltaLlamadosEstadosPosiblesComponent', () => {
  let component: AltaLlamadosEstadosPosiblesComponent;
  let fixture: ComponentFixture<AltaLlamadosEstadosPosiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaLlamadosEstadosPosiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaLlamadosEstadosPosiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
