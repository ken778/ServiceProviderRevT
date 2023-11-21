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
import { ProductService } from 'src/app/unAuth/services/product/product.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';

@Component({
  selector: 'app-edit-contact-details',
  templateUrl: './edit-contact-details.component.html',
  styleUrls: ['./edit-contact-details.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent]
 })
export class EditContactDetailsComponent  implements OnInit {

  //vari
   isActive = true
   isVarified = false
   ownerId!:any;
   imageSource!:any;
   imageUrl!:any;
   storeDetails!:any;
   //styles
   modalStyle={
    '--height': 'auto',
  }
  imagecontainer = {
    'border': '1px solid #16924a',
  }
  avatarStyle = {
    '--border-radius':'4px',
    'height': '200px',
    'width': '200px',
  }
  
  constructor(private _authServ: AuthServiceService, private _toast: ToastService, private _storageServ: ImageUploadService, private _productServ : ProductService) {
    this.getLoogedInUser()
   }

  formGroup = new FormGroup({
    store_name:new FormControl('', [Validators.required]),
    desc:new FormControl('', [Validators.required]),
    email_address:new FormControl('', [Validators.required]),
    office_no_1:new FormControl('', [Validators.required]),
    office_no_2:new FormControl('', [Validators.required]),
  
  })

  ngOnInit() {

  }


  getLoogedInUser(){
    this._authServ.loggedInUser().subscribe({
      next: (res) => {
        this.ownerId = res?.uid
        console.log(this.ownerId)
        this.getStoreDetails(this.ownerId)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  updateDetails(){
     const detailsData = {
      store_name:this.formGroup.get('store_name')?.value,
      desc:this.formGroup.get('desc')?.value,
      email_address:this.formGroup.get('email_address')?.value,
      office_no_1:this.formGroup.get('office_no_1')?.value,
      office_no_2:this.formGroup.get('office_no_2')?.value,
      isActive:this.isActive,
      isVarified: this.isVarified,
      ownerId: this.ownerId,
      storeImage:this.imageUrl
     }
     this.saveDetails(this.ownerId, detailsData)

  }

  //saving store details 
  saveDetails(id:any, data:any){
   this._authServ.addStoreDetails(id,data).then((res)=>{
     console.log('data saved')
     this._toast.presentToast('Store details updated successfully', 'success')
   })
   .catch(()=>{
     console.log('error')
     this._toast.presentToast('Store details could not be updated', 'danger')
   })
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
      const url = await this._storageServ.uploadImage(blob, image, 'storeImage')
      this.imageUrl = image.dataUrl;
      this.imageSource = url;
      console.log('from storage',url)
    } catch (error) {
      console.log(error)
    }
 
  }

  //get store details 
  getStoreDetails(uid:any){
    this._authServ.getStoreDetails(uid).subscribe({
      next: (res) => {
        console.log(res)
        if(res){
          this.storeDetails = res
          this.formGroup.get('store_name')?.setValue(res.store_name)
          this.formGroup.get('desc')?.setValue(res.desc)
          this.formGroup.get('email_address')?.setValue(res.email_address)
          this.formGroup.get('office_no_1')?.setValue(res.office_no_1)
          this.formGroup.get('office_no_2')?.setValue(res.office_no_2)
          this.isActive = res.isActive
          this.isVarified = res.isVarified
          this.imageUrl = res.storeImage
        }
       
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  //update store 
  updateStore() {
      const data = {
        store_name: this.formGroup.get('store_name')?.value,
        desc: this.formGroup.get('desc')?.value,
        email_address: this.formGroup.get('email_address')?.value,
        office_no_1: this.formGroup.get('office_no_1')?.value,
        office_no_2: this.formGroup.get('office_no_2')?.value,
        storeImage: this.imageUrl
      }
      this._authServ.updateStore(this.ownerId, data).then(() => {
        this._toast.presentToast('Store updated successfully','success');
      }).catch(() => {
        this._toast.presentToast('Store not updated', 'danger');
      })
   
  }
  //ADD STORE 
  addStore(){
    if(this.formGroup.valid){
      const data = {
        store_name: this.formGroup.get('store_name')?.value,
        desc: this.formGroup.get('desc')?.value,
        email_address: this.formGroup.get('email_address')?.value,
        office_no_1: this.formGroup.get('office_no_1')?.value,
        office_no_2: this.formGroup.get('office_no_2')?.value,
        storeImage: this.imageUrl,
        isActive:true,
        isVarified: false,
        ownerId:this.ownerId
  
      }
      this._authServ.addStoreDetails(this.ownerId,data).then(() => {
        this._toast.presentToast('Store added successfully','success');
      }).catch(() => {
        this._toast.presentToast('Store not added', 'danger');
      })
    }
   
  }

}
