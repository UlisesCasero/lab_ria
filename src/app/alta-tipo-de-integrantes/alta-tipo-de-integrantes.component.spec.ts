import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTipoDeIntegrantesComponent } from './alta-tipo-de-integrantes.component';

describe('AltaTipoDeIntegrantesComponent', () => {
  let component: AltaTipoDeIntegrantesComponent;
  let fixture: ComponentFixture<AltaTipoDeIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTipoDeIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaTipoDeIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
