import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Apuesta from 'src/app/core/interfaces/apuesta.interface';

@Component({
  selector: 'app-apuesta-edit',
  templateUrl: './apuesta-edit.component.html',
  styleUrls: ['./apuesta-edit.component.scss'],
})
export class ApuestaEditComponent  implements OnInit {

  form: FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('bets') set apuesta(apuesta:Apuesta){
    if(apuesta){
      this.form.controls['id'].setValue(apuesta.id);
      this.form.controls['idCircuit'].setValue(apuesta.idCircuit);
      this.form.controls['idDriver'].setValue(apuesta.idDriver);
      this.form.controls['betMoney'].setValue(apuesta.betMoney);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private modalCtrl:ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id:[''],
      idCircuit:[''],
      idDriver:[''],
      betMoney:[0]
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSubmit(){
    this.modalCtrl.dismiss({bets: this.form.value, mode:this.mode}, 'ok');
  }

}
