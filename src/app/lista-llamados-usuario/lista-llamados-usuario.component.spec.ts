import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLlamadosUsuarioComponent } from './lista-llamados-usuario.component';

describe('ListaLlamadosUsuarioComponent', () => {
  let component: ListaLlamadosUsuarioComponent;
  let fixture: ComponentFixture<ListaLlamadosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLlamadosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLlamadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
