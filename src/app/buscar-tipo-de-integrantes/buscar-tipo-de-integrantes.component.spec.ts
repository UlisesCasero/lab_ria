import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTipoDeIntegrantesComponent } from './buscar-tipo-de-integrantes.component';

describe('BuscarTipoDeIntegrantesComponent', () => {
  let component: BuscarTipoDeIntegrantesComponent;
  let fixture: ComponentFixture<BuscarTipoDeIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarTipoDeIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTipoDeIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
