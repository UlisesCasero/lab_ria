import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoDocumentosComponent } from './listar-tipo-documentos.component';

describe('ListarTipoDocumentosComponent', () => {
  let component: ListarTipoDocumentosComponent;
  let fixture: ComponentFixture<ListarTipoDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
