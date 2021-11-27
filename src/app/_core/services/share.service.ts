import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private userLogin = new BehaviorSubject(null);
  constructor() {

    const userLocal = JSON.parse(localStorage.getItem("useradmin") || "null");

    this.userLogin.next(userLocal);
  }

  get user() {
    return this.userLogin;
  }
  set user(user: any) {
    this.userLogin.next(user);
  }

}
