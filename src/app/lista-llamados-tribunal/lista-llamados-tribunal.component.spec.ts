import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLlamadosTribunalComponent } from './lista-llamados-tribunal.component';

describe('ListaLlamadosTribunalComponent', () => {
  let component: ListaLlamadosTribunalComponent;
  let fixture: ComponentFixture<ListaLlamadosTribunalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLlamadosTribunalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLlamadosTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
