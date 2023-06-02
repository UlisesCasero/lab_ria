import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIniciarSesionComponent } from './login-iniciar-sesion.component';

describe('LoginIniciarSesionComponent', () => {
  let component: LoginIniciarSesionComponent;
  let fixture: ComponentFixture<LoginIniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginIniciarSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginIniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
