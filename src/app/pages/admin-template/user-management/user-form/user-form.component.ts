import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { NotificationService } from 'src/app/_core/shares/notification.service';
import { UserService } from '../../_services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @ViewChild('userForm') userForm: any;

  isAddUserSuccess: boolean = false;
  addUserError: string = '';
  constructor(
    public userService: UserService,
    private notificationService: NotificationService,
    private data: DataService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {}

  onClear() {
    this.userService.userForm.reset();
    this.userService.initializeFormGroup();
  }

  onSubmit() {
    if (this.userService.userForm.valid) {
      if (this.userService.userForm.get('$key')?.value === null)
        this.addUser(this.userService.userForm.value);
      else {
        this.editUser(this.userService.userForm.value);
      }
    }
  }

  onClose() {
    this.userService.userForm.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
    this.userService.filter('Close form');
  }

  addUser(user: any) {
    user.maNhom = 'GP01';
    this.data.post(`QuanLyNguoiDung/ThemNguoiDung`, user).subscribe(
      () => {
        this.userService.userForm.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success('Thêm người dùng thành công');
        this.onClose();
      },
      (error) => {
        this.notificationService.warn(error.error);
      }
    );
  }

  editUser(user: any) {
    user.maNhom = 'GP01';
    this.data.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user).subscribe(
      () => {
        this.userService.userForm.reset();
        this.userService.initializeFormGroup();
        this.notificationService.success('Cập nhật thành công');
        this.onClose();
      },
      (error) => {
        this.notificationService.warn(error.error);
      }
    );
  }

}
