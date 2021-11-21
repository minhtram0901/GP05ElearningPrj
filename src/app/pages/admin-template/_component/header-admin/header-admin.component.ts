import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent implements OnInit {
  username: string = '';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('useradmin')) {
      const userInfo: any = localStorage.getItem('useradmin');
      this.username = JSON.parse(userInfo).taiKhoan;
    }
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
