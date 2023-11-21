import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { categories } from 'src/app/shared/product-objects/product-objects';
import { ImageUploadService } from 'src/app/unAuth/services/file-upload/image-upload.service';
import { ProductService } from 'src/app/unAuth/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone:true,
  imports:[CommonModule, IonicModule, InputComponent, ButtonComponent, HeaderComponent, DropdownInputComponent,TextAreaComponent]
})
export class ProductDetailsComponent  implements OnInit {

  //variables
  categories = categories
  productDetails!: any;
  imageUrl!:any;
  imageSource!:any;	
  categoryName!: any
  productId!: any	

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    bundlePrice: new FormControl('', [Validators.required]),
    itemQuantity: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private _productServ: ProductService,private _storageServ: ImageUploadService,private _router: Router) { }

  ngOnInit() {
    this.getProductDetails()
  }

  //retrieve product details
  getProductDetails(){
    this.route.params.subscribe((params) => {
      console.log(params['id'])
      this.productId = params['id']
      this.getSingleProduct(params['id'])
    })
  }

  //get single product details
  getSingleProduct(id: any){
       this._productServ.getSingleProduct(id).subscribe({
        next: (res) => {
          console.log(res[0])
          this.productDetails = res[0]
          this.fillForm(this.productDetails)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  //fill form
  fillForm(productDetail:any){
       this.productForm.get('productName')?.setValue(productDetail.name)
       this.productForm.get('bundlePrice')?.setValue(productDetail.character.price)
       this.productForm.get('itemQuantity')?.setValue(productDetail.character.quantity_added)
       this.productForm.get('desc')?.setValue(productDetail.desc)
       this.productForm.get('category')?.setValue(productDetail.character.category)
       this.imageUrl = productDetail.url
       this.categoryName = productDetail.character.category
       this.selectedValueChanged
  }

  //set category
  selectedValueChanged(event: any){
     event.target.value = this.categoryName
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

  //update product
  updateProduct(){
   const data = {
    name: this.productForm.get('productName')?.value,
    character: {
      price: this.productForm.get('bundlePrice')?.value,
      quantity_added: this.productForm.get('itemQuantity')?.value,
      category: this.productForm.get('category')?.value,
      quantity_available: this.productDetails.character.quantity_available,
      quantity_sold : this.productDetails.character.quantity_sold,
      status:this.productDetails.character.status,
    },
    desc: this.productForm.get('desc')?.value,
    url: this.imageUrl
   }
 
    this._productServ.updateProduct(this.productId, data).then((res)=>{
      console.log('data updated successfully')
      this._router.navigate(['/home/products'])
    }).catch((error)=>{
      console.log('data was not updated ')
    })
  }

}
