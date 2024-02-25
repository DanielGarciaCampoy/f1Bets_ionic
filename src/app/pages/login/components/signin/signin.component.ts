import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { SignupComponent } from '../signup/signup.component';
import { FirebaseService } from 'src/app/core/services/firebase/firebase-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent  implements OnInit {

  form: FormGroup;

  constructor(
    private userSvc: UserService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {}

  onSignIn() {
    this.userSvc.login(this.form.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['tabs/home'], {replaceUrl:true});
      })
      .catch(error => console.log(error));
  }


}
