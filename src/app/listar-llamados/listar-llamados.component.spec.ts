import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLlamadosComponent } from './listar-llamados.component';

describe('ListarLlamadosComponent', () => {
  let component: ListarLlamadosComponent;
  let fixture: ComponentFixture<ListarLlamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLlamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLlamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
