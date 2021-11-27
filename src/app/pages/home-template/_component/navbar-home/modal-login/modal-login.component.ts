import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { ShareService } from 'src/app/_core/services/share.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  @ViewChild("close") close: any;
  error: any;
  constructor(private dataService: DataService, private shareService: ShareService) { }

  ngOnInit(): void {
  }
  onSubmit(value: string) {
    this.dataService.post("QuanLyNguoiDung/DangNhap", value).subscribe({
      next: (data) => {
        this.shareService.user = data;
        this.error = null;
        localStorage.setItem("useradmin", JSON.stringify(data));
        this.close.nativeElement.click();
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

}
