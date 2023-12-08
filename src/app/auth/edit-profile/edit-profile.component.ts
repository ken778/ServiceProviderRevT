import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { ImageUploadService } from 'src/app/unAuth/services/file-upload/image-upload.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent]
})
export class EditProfileComponent  implements OnInit {
 

  //variables
  ownerId!:any;
  imageSource!:any;
  imageUrl!:any;
  userInfo!:any;
  userId!:any;
  imageLoading = false
  
  imagecontainer = {
    'border': '1px solid #16924a',
  }
  avatarStyle = {
    '--border-radius':'4px',
    'height': '200px',
    'width': '200px',
  }

  constructor( private _auth: AuthServiceService, private _toast: ToastService, private _storageServ: ImageUploadService) { }
  formGroup = new FormGroup({
    first_name:new FormControl('', [Validators.required]),
    last_name:new FormControl('', [Validators.required]),
    phone_number:new FormControl('', [Validators.required]),
    email_address:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
  
  })

  ngOnInit() {
    this.getUserId();
  }

    //select picture
    takePicture = async () => {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source:CameraSource.Prompt,
         
        });
        this.imageSource = image.dataUrl;
        console.log(image)
        console.log('helo')
        //calling convert image url into Blob function
        const blob = this._storageServ.dataURLtoBlob(image.dataUrl)
        const url = await this._storageServ.uploadImage(blob, image, 'ProfileImages')
        this.imageUrl = image.dataUrl;
        this.imageSource = url;
        console.log('from storage',url)
      } catch (error) {
        console.log(error)
      }
   
    }
     //get user details
  getUserId() {
    //get looged in user id
    this._auth.loggedInUser().subscribe({
      next: (data) => {
        console.log('id', data?.uid);
        this.getUserDetail(data?.uid);
        this.userId = data?.uid;
   
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  //fetch user
  getUserDetail(uid: any) {
    
    this._auth.getUser(uid).subscribe({
      next: (snapshot) => {
        console.log(snapshot);
        this.userInfo = snapshot;
        console.log('data', this.userInfo);
        //fill form
        this.fillForm(this.userInfo)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

    fillForm(data: any) {
      this.formGroup.setValue({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        email_address: data.email_address,
        city: data.city,
      });
      this.imageUrl = data.imageUrl
    }


    updateDetails(){
      const detailsData = {
        first_name:this.formGroup.get('first_name')?.value,
        last_name:this.formGroup.get('last_name')?.value,
       email_address:this.formGroup.get('email_address')?.value,
       phone_number:this.formGroup.get('phone_number')?.value,
       city:this.formGroup.get('city')?.value,
       imageUrl:  this.imageUrl,
      }
      //to call set details
      this._auth.updateUser(this.userId, detailsData).then(() => {
        this._toast.presentToast('Details updated successfully',  'success');
      }).catch(() => {
        this._toast.presentToast('Details not updated',  'danger');
      })
   }

 
 deleteAccount(){
  this._auth.loggedInUser().subscribe({
    next: (res)=>{
     console.log(res)
    },
    error: (error)=>{
        console.log(error)
    }
      
  })
}
  

}
