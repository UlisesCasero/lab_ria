import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoDocumentoComponent } from './eliminar-tipo-documento.component';

describe('EliminarTipoDocumentoComponent', () => {
  let component: EliminarTipoDocumentoComponent;
  let fixture: ComponentFixture<EliminarTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTipoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
