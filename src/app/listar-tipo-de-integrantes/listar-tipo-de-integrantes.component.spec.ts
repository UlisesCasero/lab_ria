import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoDeIntegrantesComponent } from './listar-tipo-de-integrantes.component';

describe('ListarTipoDeIntegrantesComponent', () => {
  let component: ListarTipoDeIntegrantesComponent;
  let fixture: ComponentFixture<ListarTipoDeIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoDeIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoDeIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
