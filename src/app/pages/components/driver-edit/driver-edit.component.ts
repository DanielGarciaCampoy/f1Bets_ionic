import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import Driver from 'src/app/core/interfaces/driver.interface';
import { PhotoItem, PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
})
export class DriverEditComponent  implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  
  @Input('driver') set driver(driver:Driver) {
    if (driver) {
      this.form.controls['id'].setValue(driver.id);
      this.form.controls['name'].setValue(driver.name);
      this.form.controls['yearBirth'].setValue(driver.yearBirth);
      this.form.controls['team'].setValue(driver.team);
      this.form.controls['picture'].setValue(driver.picture);
      
      if (driver.picture)
        this.currentImage.next(driver.picture);
      this.form.controls['pictureFile'].setValue(null);
      
      this.mode = "Edit";
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl:ModalController,
    private cdr:ChangeDetectorRef,
    private photoSvc: PhotoService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      name: [''],
      picture: [''],
      yearBirth: [0],
      team: [''],
      pictureFile: [null]
    });
  }

  ngOnInit() {}

  onSubmit(){
    this.modalCtrl.dismiss({driver: this.form.value, mode:this.mode}, 'ok');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls['pictureFile'].setValue(item.blob);
  }

}
