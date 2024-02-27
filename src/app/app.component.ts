import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UserService } from './core/services/user.service';
import { NavigationEnd, Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  folder: any;
  constructor(
    public userSvc: UserService,
    private router:Router
  ) {
    this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          console.log(value.url);
          this.folder = value.url;
        }
      },
      error: (err) => console.log(err)
    });
  }
  
  logOut() {
    return this.userSvc.logOut();
  }
}
