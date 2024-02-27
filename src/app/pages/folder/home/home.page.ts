import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
  }

  getUser() {
    return this.userSvc.getUser();
  }

  logOut() {
    return this.userSvc.logOut();
  }

}
