import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento.component';

describe('BuscarTipoDocumentoComponent', () => {
  let component: BuscarTipoDocumentoComponent;
  let fixture: ComponentFixture<BuscarTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarTipoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
