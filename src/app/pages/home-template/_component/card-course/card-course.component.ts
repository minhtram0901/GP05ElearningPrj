import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { ShareService } from 'src/app/_core/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})
export class CardCourseComponent implements OnInit {
  @Input() course: any;
  isRegister: boolean = true;
  constructor(private dataService: DataService, private router: Router, private shareService: ShareService) { }

  ngOnInit(): void {
    if (Object.keys(this.course).length === 2) {
      this.isRegister = false;
      this.dataService.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${this.course?.maKhoaHoc}`).subscribe((result) => {
        this.course = result;
      });
    }
  }

  onRegister() {
    const userLocal = JSON.parse(localStorage.getItem("useradmin") || "null");
    if (userLocal) {
      const infoResiger = {
        maKhoaHoc: this.course.maKhoaHoc,
        taiKhoan: userLocal.taiKhoan
      };

      this.dataService.post("QuanLyKhoaHoc/DangKyKhoaHoc", infoResiger, {
        responseType: 'text',
      }).subscribe(
        {
          next: (data: any) => {
            Swal.fire({
              title: 'Bạn đã đăng ký thành công!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              this.router.navigate([`/detail/${this.course.maKhoaHoc}`],);
            });
          }
          , error: (error) => {
            this.router.navigate([`/detail/${this.course.maKhoaHoc}`],);
          }
        });
    }
  }
  onCancelRegister() {
    Swal.fire({
      title: 'Bạn có muốn hủy đăng ký khóa học không',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Có',
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        const taiKhoan = this.shareService.user.value.taiKhoan;
        const maKhoaHoc = this.course.maKhoaHoc;
        this.dataService.post("QuanLyKhoaHoc/HuyGhiDanh", { taiKhoan, maKhoaHoc }, {
          responseType: 'text',
        }).subscribe((result) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bạn đã hủy đăng ký thành công',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            this.router.navigateByUrl("/");
          });

        });
      }
    });
  }
}