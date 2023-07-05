import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTribunalComponent } from './asignar-tribunal.component';

describe('AsignarTribunalComponent', () => {
  let component: AsignarTribunalComponent;
  let fixture: ComponentFixture<AsignarTribunalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarTribunalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
