import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  userForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    taiKhoan: new FormControl(''),
    matKhau: new FormControl(''),
    hoTen: new FormControl(''),
    soDT: new FormControl(''),
    maLoaiNguoiDung: new FormControl('1'),
    maNhom: new FormControl('GP01'),
    email: new FormControl(''),
  });
}
