import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { ShareService } from 'src/app/_core/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit {
  @ViewChild("btnClose") btnClose: any;
  error: any;
  constructor(private dataService: DataService, private shareData: ShareService) { }

  ngOnInit(): void {
  }
  onSubmit(value: any) {
    value.maNhom = "GP01";
    this.dataService.post("QuanLyNguoiDung/DangKy", value).subscribe({
      next: (data) => {

        this.loginAct(data);


        this.btnClose.nativeElement.click();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bạn đã đăng ký thành công',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

  loginAct(value: any) {
    this.dataService.post("QuanLyNguoiDung/DangNhap", value).subscribe({
      next: (data) => {
        this.shareData.user = data;
        this.error = null;
        localStorage.setItem("useradmin", JSON.stringify(data));
      },
      error: (error) => {

        this.error = error;
      }
    });
  }

}
