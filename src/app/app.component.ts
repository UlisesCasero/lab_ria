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
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    initTE({ Dropdown, Ripple });
    this.changeDetectorRef.detectChanges(); // Detectar cambios después de la inicialización de la vista
  }

  @ViewChild(LoginComponent)
  loginComponent!: LoginComponent;

  get loggedUserName(): string | null {
    return sessionStorage.getItem('nombre');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  isAdmin(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('ADMIN');
  }

  isCoordinador(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('COORDINADOR');
  }

  isTribunal(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('TRIBUNAL');
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  
  redirectToLoginForm() {
    this.router.navigate(['/login-sesion']);
  }

  isRootRoute(): boolean {
    return this.router.url === '/';
  }

  isUsuario(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('USER');
  }

  ngOnInit() {
    //if (this.isUsuario()) {
      
    //}
  }

}
@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
  ]
})
export class AppModule { }
