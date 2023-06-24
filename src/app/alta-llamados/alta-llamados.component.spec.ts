import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLlamadosComponent } from './alta-llamados.component';

describe('AltaLlamadosComponent', () => {
  let component: AltaLlamadosComponent;
  let fixture: ComponentFixture<AltaLlamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaLlamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaLlamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
