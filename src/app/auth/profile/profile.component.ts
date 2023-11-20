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
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { ImageUploadService } from 'src/app/unAuth/services/file-upload/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    ModalComponent,
    EditContactDetailsComponent,
    EditOperationHoursComponent,
    EditStoreAddressComponent,
    NgIf,
  ],
})
export class ProfileComponent implements OnInit {

  //
  edit_screen!: String;
  imageSource!: any;
  userInfo!: any;
  operatingHours!: any;
  storeAddress!: any;
  spinner = false
  storeDetails!: any;

  constructor(
    private _route: Router,
    private _auth: AuthServiceService,
    private storage: Storage,
    private _storageServ: ImageUploadService
  ) {}

  ngOnInit() {
    // console.log(this.operatingHours.weekdaysStartTime)
    //get looged in user id
    //  this._auth.loggedInUser().subscribe({
    //   next: (data) => {console.log('id',data?.uid)},
    //   error: (error) => {console.log(error)},
    //  })
    this.getUserId();
    this.spinner = true
    console.log(this.spinner)
  }

  editContacts() {
    this.edit_screen = 'contact-details';
    console.log(this.edit_screen);
    this._route.navigate(['/edit-contacts']);
  }
  editOperationHours() {
    this.edit_screen = 'operation-hours';
    console.log(this.edit_screen);
    this._route.navigate(['/edit-operations']);
  }

  editStoreAddress() {
    this.edit_screen = 'store-address';
    console.log(this.edit_screen);
    this._route.navigate(['/edit-address']);
  }
  //take picture
  takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });
      this.imageSource = image.dataUrl;
      console.log(image);
      console.log('helo');
      //calling convert image url into Blob function
      const blob = this._storageServ.dataURLtoBlob(image.dataUrl);
      const url = await this._storageServ.uploadImage(blob, image, 'test');
      console.log('from storage', url);
    } catch (error) {
      console.log(error);
    }
  };

  // //convert image url into Blob
  // dataURLtoBlob(dataurl:any){
  //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);;
  //     while(n--){
  //         u8arr[n] = bstr.charCodeAt(n);
  //     }
  //     return new Blob([u8arr], {type:mime});
  // }

  // //uploading image
  // async uploadImage(blob:any, imageData:any) {
  //       try {
  //         const currentDate = Date.now();
  //         const filePath = `test/${currentDate}.${imageData.format}`;
  //         const filRef = ref(this.storage, filePath)
  //         const task = await uploadBytes(filRef, blob)
  //         console.log('task', task)
  //         const url = getDownloadURL(filRef)
  //         return url

  //       } catch (error) {
  //         throw(error)

  //       }
  // }

  //fetch user
  getUserDetail(uid: any) {

    this._auth.getUser(uid).subscribe({
      next: (snapshot) => {
        console.log(snapshot);
        this.userInfo = snapshot;
        console.log('data', this.userInfo);
        this.spinner = false
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //get store hours
  getStoreOperatingHours(uid: any) {
    this._auth.getStoreHours(uid).subscribe({
      next: (res) => {
        console.log('hours', res);
        this.operatingHours = res
       

      },
      error: (error) => {
        console.log('while fetching hours', error);
      },
    });
  }
  //get store address 
  getStoreAddress(id:any){
    this._auth.getStoreAddress(id).subscribe({
      next: (res) => {
        console.log('address', res);
        this.storeAddress = res
      },
      error: (error) => {
        console.log('while fetching address', error);
      },
    });
  }

  //get user details
  getUserId() {
    //get looged in user id
    this._auth.loggedInUser().subscribe({
      next: (data) => {
        console.log('id', data?.uid);
        this.getUserDetail(data?.uid);
        this.getStoreDetails(data?.uid);
        this.getStoreOperatingHours(data?.uid);
        this.getStoreAddress(data?.uid);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //logout
  logout() {
    this._auth.loggedInUser().subscribe({
      next: () => {
        this._route.navigate(['/sign-in']);
      },
    });
  }
  //navigate to edit profile
  editProfile() {
    this._route.navigate(['/edit-profile']);
  }

  //get store details
  getStoreDetails(id:any){
    this._auth.getStoreDetails(id).subscribe({
      next: (res) => {
        console.log('details', res);
        this.storeDetails = res
        console.log(this.storeDetails)
      },
      error: (error) => {
        console.log('while fetching details', error);
      },
    });
  }
  
}