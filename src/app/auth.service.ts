import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue = false;
  public currentUser: any;
  loggedInUser: User | null = null;
  constructor() { }

  setLoggedIn(value: boolean) {
    this.isLoggedInValue = value;
  }

  get isLoggedIn() {
    return this.isLoggedInValue;
  }
  getUser(): any {
    return this.currentUser;
  }
}
