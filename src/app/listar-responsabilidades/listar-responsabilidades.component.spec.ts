import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarResponsabilidadesComponent } from './listar-responsabilidades.component';

describe('ListarResponsabilidadesComponent', () => {
  let component: ListarResponsabilidadesComponent;
  let fixture: ComponentFixture<ListarResponsabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarResponsabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarResponsabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
