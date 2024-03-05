import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import { PhotoItem, PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-circuitos-edit',
  templateUrl: './circuitos-edit.component.html',
  styleUrls: ['./circuitos-edit.component.scss'],
})
export class CircuitosEditComponent  implements OnInit {

  form: FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('circuit') set circuit(circuit:Circuit) {
    if (circuit) {
      this.form.controls['id'].setValue(circuit.id);
      this.form.controls['nameCircuit'].setValue(circuit.nameCircuit);
      this.form.controls['country'].setValue(circuit.country);
      this.form.controls['laps'].setValue(circuit.laps);
      this.form.controls['length'].setValue(circuit.length);
      this.form.controls['picture'].setValue(circuit.picture);
      
      if (circuit.picture)
        this.currentImage.next(circuit.picture);
      this.form.controls['pictureFile'].setValue(null);
      
      this.mode = "Edit";
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private photoSvc: PhotoService,
    private cdr:ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      nameCircuit: [''],
      country: [''],
      laps: [0],
      length: [0],
      picture: [''],
      pictureFile: [null]
    });
  }

  ngOnInit() {}

  onSubmit(){
    this.modalCtrl.dismiss({circuit: this.form.value, mode:this.mode}, 'ok');
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
