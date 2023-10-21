import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { EditContactDetailsComponent } from '../edit-contact-details/edit-contact-details.component';
import { EditOperationHoursComponent } from '../edit-operation-hours/edit-operation-hours.component';
import { EditStoreAddressComponent } from '../edit-store-address/edit-store-address.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[IonicModule,HeaderComponent, ModalComponent, EditContactDetailsComponent, EditOperationHoursComponent, EditStoreAddressComponent, NgIf]
})
export class ProfileComponent  implements OnInit {

  edit_screen!: String;
  imageSource!:any;
  constructor(private _route: Router) { }

  ngOnInit() {}

  editContacts(){
     this.edit_screen = 'contact-details'
     console.log(this.edit_screen)
     this._route.navigate(['/edit-contacts'])
  }
  editOperationHours(){
    this.edit_screen = 'operation-hours'
    console.log(this.edit_screen)
    this._route.navigate(['/edit-operations'])
  }

  editStoreAddress(){
    this.edit_screen = 'store-address'
    console.log(this.edit_screen)
    this._route.navigate(['/edit-address'])
  }
  //take picture
   takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt,
     
    });
    this.imageSource = image.dataUrl;
    console.log(this.imageSource)
    console.log('helo')
  }

}
