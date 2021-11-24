import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFormComponent } from 'src/app/pages/admin-template/user-management/user-form/user-form.component';

@Injectable({
  providedIn: 'root',
})
export class CandeativateGuard implements CanDeactivate<UserFormComponent> {
  canDeactivate(component: any) {
    const result =
      component.canDeactivateRegister() ||
      window.confirm('Bạn có muốn rời khỏi trang này không?');
    return result;
  }
}
