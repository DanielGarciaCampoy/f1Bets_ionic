import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordValidation } from 'src/app/core/utils/password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {

  form: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder:FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.form = this.formBuilder.group({
      userName: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword:["", Validators.required]
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});
    }

  ngOnInit() {}

  onRegister(){
    this.modalCtrl.dismiss({
      userName:this.form.value.userName,
      email:this.form.value.email,
      password:this.form.value.password,
    }, 'ok');
  }
  
  hasFormError(error: string){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors: {}){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}