import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private cdr:ChangeDetectorRef,
    private userSvc: UserService
  ) {
    this.form = this.fb.group({
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
    }).catch(error => {
      console.error('Error al editar usuario: ', error);
    });
  }*/

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
