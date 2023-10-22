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
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';

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
  userInfo!: any
  constructor(private _route: Router,private _auth: AuthServiceService) { }

  ngOnInit() {
    //get looged in user id
  //  this._auth.loggedInUser().subscribe({
  //   next: (data) => {console.log('id',data?.uid)},
  //   error: (error) => {console.log(error)},
  //  })
  this.getUserId()
  
  }



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


  //get user details
  getUserId(){
        //get looged in user id
   this._auth.loggedInUser().subscribe({
    next: (data) => {
      console.log('id',data?.uid)
      this.getUserDetail(data?.uid)
    },
    error: (error) => {console.log(error)},
   })
  }

  //fetch user
  getUserDetail(uid:any){
    this._auth.getUser(uid).subscribe({
      next: (snapshot) => {
          console.log(snapshot)
          this.userInfo = snapshot
          console.log('data', this.userInfo)
          
      },
      error: (error) => {
        console.log(error);
      }
     })
  }

}
