import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoDocumentoComponent } from './listar-tipo-documento.component';

describe('ListarTipoDocumentoComponent', () => {
  let component: ListarTipoDocumentoComponent;
  let fixture: ComponentFixture<ListarTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
