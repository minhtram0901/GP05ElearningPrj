import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
})
export class AdminAuthComponent implements OnInit {
  loginErr: string = '';
  constructor(private data: DataService, private router: Router) {}
  taiKhoan: string = '';
  ngOnInit(): void {}

  login(user: any) {
    this.data.post('QuanLyNguoiDung/DangNhap', user).subscribe(
      (result: any) => {
        if (result.maLoaiNguoiDung === 'GV') {
          // luu local storage
          localStorage.setItem('useradmin', JSON.stringify(result));
          // redirect to dashboard
          this.router.navigate(['/admin/dashboard']);
        } else {
          // thong bao
          this.loginErr = 'Bạn không có quyền truy cập';
        }
      },
      (error: any) => {
        this.loginErr = error.error;
      }
    );
  }
}
