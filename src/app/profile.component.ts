import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {{ authService.currentUser?.nombre }}</p>
      <p>Email: {{ authService.currentUser?.email }}</p>
    </div>
  `
})
export class ProfileComponent {
  constructor(public authService: AuthService) {}
}
