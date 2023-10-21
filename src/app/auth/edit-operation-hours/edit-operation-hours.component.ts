import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-edit-operation-hours',
  templateUrl: './edit-operation-hours.component.html',
  styleUrls: ['./edit-operation-hours.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NgIf,
    ModalComponent,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
  ],
})
export class EditOperationHoursComponent implements OnInit {
  //time variables
  weekdayStartTime: string = '';
  weekdayEndTime: string = '';

  saturdayStartTime: string = '';
  saturdayEndTime: string = '';

  sundayStartTime: string = '';
  sundayEndTime: string = '';

  operationHours = [{weekdaysStartTime: '10:00', weekdaysEndTime: '12:00'}, {saturdaysStartTime: '9:00', saturdaysEndTime: '1:00'}, {sundaysStartTime: '8:00', sundaysEndTime: '12:00'}]

  constructor() {}
 
  operationHours$ = of(this.operationHours)

  ngOnInit() {}

  weekdayStart(event: any) {
    console.log(event.target.value);
    console.log('hello i have changed');
    this.weekdayStartTime = event.target.value;
  }
  weekdayEnd(event: any) {
    console.log('weekdaysEndTime', event.target.value);
    this.weekdayEndTime = event.target.value;
    
  }
  saturdayStart(event: any) {
    console.log('saturdayStartTime', event.target.value);
    this.saturdayStartTime = event.target.value;
  }
  saturdayEnd(event: any) {
    console.log('saturdayEndTime', event.target.value);
    this.saturdayEndTime = event.target.value;
  }
  sundayStart(event: any) {
    console.log('sundayStartTime', event.target.value);
    this.sundayStartTime = event.target.value;
  }
  sundayEnd(event: any) {
    console.log('sundayEndTime', event.target.value);
    this.sundayEndTime = event.target.value;
  }

  update(){
          console.log(this.operationHours)
  }
}
