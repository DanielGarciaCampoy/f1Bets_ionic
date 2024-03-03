import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent  implements OnInit {

  form:FormGroup;

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('user') set user(user:User) {
    if (user) {
      this.form.controls['uid'].setValue(user.uid);
      this.form.controls['userName'].setValue(user.userName);
      // this.form.controls['email'].setValue(user.email);
      // this.form.controls['betMoney'].setValue(user.betMoney);
      // this.form.controls['picture'].setValue(user.picture);

      /*if (user.picture)
        this.currentImage.next(user.picture);
      this.form.controls['pictureFile'].setValue(null);*/
    }
  }

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private cdr:ChangeDetectorRef,
    private userSvc: UserService
  ) {
    this.form = this.fb.group({
      uid: [null],
      userName:['', [Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  /*onSubmit() {
    const userData = this.form?.value;
    // const pictureFile = this.form?.get('pictureFile')?.value;

    this.userSvc.updateUser(userData).then(() => {
      this.modalCtrl.dismiss({ user: userData }, 'ok');
    }).catch((error: any) => {
      console.error('Error al editar usuario: ', error);
    });
  }*/

  onSubmit() {
    this.modalCtrl.dismiss({ user: this.form.value }, 'ok');
  }

  /*changePic(fileLoader: any){
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      var reader = new FileReader();
      reader.onload = () => {   
        that.currentImage.next(reader.result as string);
        that.cdr.detectChanges();
        that.form?.controls['pictureFile'].setValue(file);
      };
      reader.onerror = (error) =>{
        console.log(error);
      }
      reader.readAsDataURL(file);
    }
  }*/

}
