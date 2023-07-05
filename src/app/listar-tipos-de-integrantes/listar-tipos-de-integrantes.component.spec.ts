import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposDeIntegrantesComponent } from './listar-tipos-de-integrantes.component';

describe('ListarTiposDeIntegrantesComponent', () => {
  let component: ListarTiposDeIntegrantesComponent;
  let fixture: ComponentFixture<ListarTiposDeIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposDeIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposDeIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
