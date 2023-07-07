import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPersonaLlamadoComponent } from './alta-persona-llamado.component';

describe('AltaPersonaLlamadoComponent', () => {
  let component: AltaPersonaLlamadoComponent;
  let fixture: ComponentFixture<AltaPersonaLlamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPersonaLlamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPersonaLlamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
