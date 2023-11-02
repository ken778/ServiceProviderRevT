import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';

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
  weekdayStartTime!: string;
  weekdayEndTime!: string;

  saturdayStartTime!: string;
  saturdayEndTime!: string;

  sundayStartTime!: string;
  sundayEndTime!: string;
  ownerId!: any;



  constructor(private _auth:AuthServiceService, private _toast: ToastService) {
    this.getUserId()
  }

  // operationHours$ = of(this.operationHours);

  //function to format time
  formatTime(time: any) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var timeString = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    return timeString;
  }

  ngOnInit() {}

  //get user id
  getUserId() {
    this._auth.loggedInUser().subscribe((res) => {
      this.ownerId = res?.uid;
    });
  }

  weekdayStart(event: any) {
    console.log(new Date(event.target.value));
    this.weekdayStartTime = this.formatTime(event.target.value);
    console.log('hello i have changed', this.weekdayStartTime);
  }
  weekdayEnd(event: any) {
    console.log('weekdaysEndTime', event.target.value);
    this.weekdayEndTime = this.formatTime(event.target.value);
  }
  saturdayStart(event: any) {
    console.log('saturdayStartTime', event.target.value);
    this.saturdayStartTime = this.formatTime(event.target.value);
  }
  saturdayEnd(event: any) {
    console.log('saturdayEndTime', event.target.value);
    this.saturdayEndTime = this.formatTime(event.target.value);
  }
  sundayStart(event: any) {
    console.log('sundayStart', event.target.value);
    this.sundayStartTime = this.formatTime(event.target.value);
  }
  sundayEnd(event: any) {
    this.sundayEndTime = this.formatTime(event.target.value);
    console.log('sundayEnd' ,this.sundayEndTime);
  }

  //store data into the database
  storeOperationHours(id:any, data:any) {
    this._auth.addOperationsHours(id,data,).then(()=>{
      this._toast.presentToast('Operation hours updated successfully', 'success');
    }).catch(()=>{
      this._toast.presentToast('Operation hours not updated', 'danger');
    })
  }

  update() {
    console.log(this.weekdayStartTime);
    const operationHours = {
      weekdaysStartTime: this.weekdayStartTime,
      weekdaysEndTime: this.weekdayEndTime,
      saturdaysStartTime: this.saturdayStartTime,
      saturdaysEndTime: this.saturdayEndTime,
      sundaysStartTime: this.sundayStartTime,
      sundaysEndTime: this.sundayEndTime,
      ownerId: this.ownerId,
    };

    console.log(operationHours);
    this.storeOperationHours(this.ownerId, operationHours)
  }
}
