import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DriversService } from 'src/app/core';
import  Apuesta from 'src/app/core/interfaces/apuesta.interface';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import Driver from 'src/app/core/interfaces/driver.interface';
import { ApuestasService } from 'src/app/core/services/apuestas.service';
import { CircuitsService } from 'src/app/core/services/circuits.service';
import { ApuestaEditComponent } from '../../components/apuesta-edit/apuesta-edit.component';

@Component({
  selector: 'app-apuestas',
  templateUrl: './apuestas.page.html',
  styleUrls: ['./apuestas.page.scss'],
})
export class ApuestasPage implements OnInit {

  constructor(
    private apuestasSvc: ApuestasService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    /*this.apuestasSvc.getApuestas().subscribe(apuestas => {
      this.apuestas = apuestas;
    })*/
  }

  getApuestas() {
    return this.apuestasSvc.apuestas$;
  }

  /*getDriverById(id: string): Promise<Driver | undefined> {
    return this.driverSvc.getDriverById(id);
  }*/

  /*async presentForm(_class: any, onDismiss:(arg0: any)=>void){
    const modal = await this.modalCtrl.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onApostar() {
    this.presentForm(ApuestaEditComponent, (data)=> {
      this.apuestasSvc.addApuesta(data.apuesta);
    });
  }*/

  async abrirApuestaForm() {
    const modal = await this.modalCtrl.create({
      component:ApuestaEditComponent,
      cssClass:"modal-full-right-side",
      componentProps:{  },
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data) {
        switch(result.data.mode) {
          case 'New':
            this.apuestasSvc.addApuesta(result.data.bets);
            break;
          case 'Edit':
            // this.apuestasSvc.updateDriver(result.data.bets);
            break;
          default:
        }
      }
    });
  }

}
