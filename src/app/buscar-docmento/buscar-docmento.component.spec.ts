import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDocmentoComponent } from './buscar-docmento.component';

describe('BuscarDocmentoComponent', () => {
  let component: BuscarDocmentoComponent;
  let fixture: ComponentFixture<BuscarDocmentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarDocmentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarDocmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
