import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { ShareService } from 'src/app/_core/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {

  listCategory: any;
  userLogin: any;

  constructor(private router: Router, private dataService: DataService, private share: ShareService) { }

  ngOnInit(): void {
    this.share.user.subscribe((user: any) => {
      this.userLogin = user;
    });
    this.dataService.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc").subscribe({
      next: (result) => {
        this.listCategory = result;
      }
    });
  }

  handleSearch(value: any) {
    if (value) {
      this.router.navigate(["/search"], {
        queryParams: {
          valueSearch: value
        }
      });
    } else {
      this.router.navigateByUrl("/");
    }
  }

  handleClickCategory(category: any) {
    this.router.navigate([`/category/${category.maDanhMuc}`],
      {
        queryParams: {
          tenDanhMuc: category.tenDanhMuc
        }
      });
  }

  handleLogout() {
    Swal.fire({
      title: 'Bạn có muốn đăng xuất không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Có',
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        this.share.user = null;
        localStorage.removeItem("useradmin");
        if (this.router.url === "/profile") {
          this.router.navigateByUrl("/");
        }
      }
    });
  }

  onInput(value: string) {
    if (value) {
      this.router.navigate([`/search`], {
        queryParams: {
          valueSearch: value
        }
      });

    } else {
      this.router.navigate(["/"]);
    }
  }

}
