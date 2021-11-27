import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  userForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    taiKhoan: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    matKhau: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    hoTen: new FormControl('', [Validators.required, Validators.minLength(2)]),
    soDT: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[0-9]*$'),
    ]),
    maLoaiNguoiDung: new FormControl('GV'),
    maNhom: new FormControl('GP01'),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  initializeFormGroup() {
    this.userForm.setValue({
      $key: null,
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDT: '',
      maLoaiNguoiDung: 'GV',
      maNhom: 'GP01',
      email: '',
    });
  }

  populateForm(user: any, matKhau: string) {
    this.userForm.setValue({
      $key: 'edit',
      taiKhoan: user.taiKhoan ? user.taiKhoan : '',
      matKhau: matKhau ? matKhau : '',
      hoTen: user.hoTen ? user.hoTen : '',
      soDT: user.soDt ? user.soDt : '',
      maLoaiNguoiDung: user.maLoaiNguoiDung ? user.maLoaiNguoiDung : 'HV',
      maNhom: 'GP01',
      email: user.email ? user.email : '',
    });
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
