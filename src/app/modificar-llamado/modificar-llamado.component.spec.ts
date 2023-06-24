import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLlamadoComponent } from './modificar-llamado.component';

describe('ModificarLlamadoComponent', () => {
  let component: ModificarLlamadoComponent;
  let fixture: ComponentFixture<ModificarLlamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLlamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLlamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
