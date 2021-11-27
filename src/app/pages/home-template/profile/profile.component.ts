import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { ShareService } from 'src/app/_core/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: any;

  userEdit = {
    chiTietKhoaHocGhiDanh: [],
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    soDT: '',
    maLoaiNguoiDung: '',
    maNhom: '',
    email: '',
  };
  constructor(private dataService: DataService, private shareService: ShareService, private router: Router) { }

  ngOnInit(): void {
    this.dataService
      .post(`QuanLyNguoiDung/ThongTinNguoiDung`, null)
      .subscribe({
        next: (data: any) => {

          this.userEdit = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });

  }

  onSubmit(value: any) {

    value.maLoaiNguoiDung = this.userEdit.maLoaiNguoiDung;
    value.taiKhoan = this.userEdit.taiKhoan;
    value.maNhom = this.userEdit.maNhom;
    this.dataService.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, value).subscribe({
      next: (data) => {

        if (data) {
          Swal.fire({
            title: 'Bạn đã cập nhật thành công!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            data.accessToken = this.shareService.user.value.accessToken;
            this.shareService.user = data;
            this.router.navigateByUrl("/");
          });
        }

      },
      error: (error) => {

        this.error = error;
      }
    });
  }

}
