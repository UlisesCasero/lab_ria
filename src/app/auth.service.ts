import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue = false;

  constructor() { }

  setLoggedIn(value: boolean) {
    this.isLoggedInValue = value;
  }

  get isLoggedIn() {
    return this.isLoggedInValue;
  }
}
