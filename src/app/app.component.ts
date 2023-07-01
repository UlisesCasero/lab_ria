import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Dropdown, Ripple, initTE } from 'tw-elements';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ria_lab';
  searchTerm: string = '';

  search() {
    console.log('Término de búsqueda:', this.searchTerm);
    
  }
  constructor(private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    initTE({ Dropdown, Ripple });
    this.changeDetectorRef.detectChanges(); // Detectar cambios después de la inicialización de la vista
  }

  @ViewChild(LoginComponent)
  loginComponent!: LoginComponent;


  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  logout() {
    // Eliminar el token de autenticación del sessionStorage
    sessionStorage.removeItem('token');
    // Redireccionar al usuario a la página de inicio de sesión u otra página adecuada
    this.router.navigate(['/']);
  }
  redirectToLoginForm() {
    this.router.navigate(['/login-sesion']);
  }

  isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
  ]
})
export class AppModule { }
