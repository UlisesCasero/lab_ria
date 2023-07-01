import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteLlamadoComponent } from './postulante-llamado.component';

describe('PostulanteLlamadoComponent', () => {
  let component: PostulanteLlamadoComponent;
  let fixture: ComponentFixture<PostulanteLlamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulanteLlamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteLlamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
