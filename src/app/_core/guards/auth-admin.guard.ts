import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (localStorage.getItem('useradmin')) {
      // da login
      return true;
    }
    // chua login
    this.router.navigate(['/auth']);
    return false;
  }
}
