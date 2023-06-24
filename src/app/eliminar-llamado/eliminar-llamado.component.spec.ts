import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLlamadoComponent } from './eliminar-llamado.component';

describe('EliminarLlamadoComponent', () => {
  let component: EliminarLlamadoComponent;
  let fixture: ComponentFixture<EliminarLlamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarLlamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarLlamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
