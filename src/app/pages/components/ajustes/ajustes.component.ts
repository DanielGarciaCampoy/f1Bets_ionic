import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {}
  
  deleteAcount() {
    
  }

}
