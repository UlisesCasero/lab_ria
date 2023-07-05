import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTipoDeIntegranteComponent } from './alta-tipo-de-integrante.component';

describe('AltaTipoDeIntegranteComponent', () => {
  let component: AltaTipoDeIntegranteComponent;
  let fixture: ComponentFixture<AltaTipoDeIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTipoDeIntegranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaTipoDeIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
