import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { Category } from '../produncts-objects/products-object';
import { of } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Router, RouterLink } from '@angular/router';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { categories } from 'src/app/shared/product-objects/product-objects';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageUploadService } from 'src/app/unAuth/services/file-upload/image-upload.service';
import { ProductService } from 'src/app/unAuth/services/product/product.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    NgStyle,
    InputComponent,
    ButtonComponent,
    DropdownInputComponent,
    ModalComponent,
    CommonModule,
    RouterLink,
    NgStyle,
    TextAreaComponent,
    NgFor,
    NgIf,
  ],
})
export class ProductsComponent implements OnInit {
  //styles
  modalStyle = {
    '--height': 'auto',
  };
  imagecontainer = {
    'border': '1px solid #16924a',
  }
  avatarStyle = {
    '--border-radius':'4px',
    'height': '200px',
    'width': '200px',
  }


  categories = categories
  //variables
  status = "IN_STOCK"
  store_key!:any;
  productList!:any;
  

  //forn input
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    bundlePrice: new FormControl('', [Validators.required]),
    itemQuantity: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });



  //streams
  Category = of(Category);
  imageSource!:any;
  imageUrl!:any;
  constructor( private _storageServ: ImageUploadService, private _productServ: ProductService,private _authServ: AuthServiceService, private _toast: ToastService, private router: Router) {
    this.getLoogedInUser()
  }

  ngOnInit() {}

  customPopoverOptions2 = {
    subHeader: 'Select your Title',
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
        this.getProducts(this.store_key )
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addProduct(){
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
       }
    }
    this.saveProduct(this.store_key, productData)
    console.log(this.productForm.value)
  }

  //adding product to database
  saveProduct(id:any,data:any) {
      this._productServ.addProduct(data).then(() => {
        console.log('success adding product')
      })
      .catch((err) => {
         console.log('Error adding product')
      })
  }

  //get products 
  getProducts(storeKey:any){
    this._productServ.getProductsById(storeKey).subscribe({
      next: (res) => {
        this.productList = res
        console.log(this.productList)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  navigateToProductDetails(product: any) {
    this.router.navigate(['/productDetails', product.id]);
  }
  openModal(){
    this.router.navigate(['add-product']);
  }
}
