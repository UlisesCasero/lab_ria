import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoDeIntegrantesComponent } from './modificar-tipo-de-integrantes.component';

describe('ModificarTipoDeIntegrantesComponent', () => {
  let component: ModificarTipoDeIntegrantesComponent;
  let fixture: ComponentFixture<ModificarTipoDeIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoDeIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoDeIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
