import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesALlamadoComponent } from './postulantes-allamado.component';

describe('PostulantesALlamadoComponent', () => {
  let component: PostulantesALlamadoComponent;
  let fixture: ComponentFixture<PostulantesALlamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulantesALlamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulantesALlamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
