import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { Category } from '../produncts-objects/products-object';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { ImageUploadService } from 'src/app/unAuth/services/file-upload/image-upload.service';
import { ProductService } from 'src/app/unAuth/services/product/product.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { categories } from 'src/app/shared/product-objects/product-objects';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone:true,
  imports:[IonicModule,  DropdownInputComponent, CommonModule, NgIf, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent]
})
export class AddProductComponent  implements OnInit {
 
  
  categories = categories
  Category = of(Category);
  imageSource!:any;
  imageUrl!:any;

  status = "IN_STOCK"
  store_key!:any;


  imagecontainer = {
    'border': '1px solid #16924a',
  }
  avatarStyle = {
    '--border-radius':'4px',
    'height': '200px',
    'width': '200px',
  }
    //forn input
    productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      bundlePrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });

    constructor( private _storageServ: ImageUploadService, private _productServ: ProductService,private _authServ: AuthServiceService, private _toast: ToastService, private router: Router) {
      this.getLoogedInUser()
    }

  ngOnInit() {}

  customPopoverOptions2 = {
    subHeader: 'Select category',
  };
  selectedValueChanged(value:any){
     console.log(value.target.value)
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
      const url = await this._storageServ.uploadImage(blob, image, 'products')
      this.imageUrl = image.dataUrl;
      console.log('from storage',url)
    } catch (error) {
      console.log(error)
    }
 
  }
  getLoogedInUser(){
    this._authServ.loggedInUser().subscribe({
      next: (res) => {
        this.store_key = res?.uid
        console.log(this.store_key)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addProduct(){
    if(this.productForm.valid){
      const productData = {
        status: this.status,
        name: this.productForm.get('productName')?.value,
        desc: this.productForm.get('desc')?.value,
        url: this.imageUrl,
        store_key:this.store_key,
 
        character:{
          price: this.productForm.get('bundlePrice')?.value,
          quantity_added: this.productForm.get('itemQuantity')?.value,
          quantity_available:this.productForm.get('itemQuantity')?.value,
          quantity_sold: 0,
          status: this.status,
          category: this.productForm.get('category')?.value,
        }
 
     }
     this.saveProduct(this.store_key, productData)
     
     console.log(this.productForm.value)
    }else{
      this._toast.presentToast('Please fill all the fields', 'danger')
    }
  
  }

  //adding product to database
  saveProduct(id:any,data:any) {
      this._productServ.addProduct(data).then(() => {
        console.log('success adding product')
        this._toast.presentToast('Product Added Successfully', 'success')
        this.router.navigate(['/home/products'])
      })
      .catch((err) => {
        this._toast.presentToast('There was a problem while adding product', 'danger')
      })
  }

}
