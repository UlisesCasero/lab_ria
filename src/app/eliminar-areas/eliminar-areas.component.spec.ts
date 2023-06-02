import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAreasComponent } from './eliminar-areas.component';

describe('EliminarAreasComponent', () => {
  let component: EliminarAreasComponent;
  let fixture: ComponentFixture<EliminarAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
