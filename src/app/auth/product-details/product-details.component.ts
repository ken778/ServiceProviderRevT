import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
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
  productDetails!: any;
  imageUrl!:any;

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    bundlePrice: new FormControl('', [Validators.required]),
    itemQuantity: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private _productServ: ProductService) { }

  ngOnInit() {
    this.getProductDetails()
  }

  //retrieve product details
  getProductDetails(){
    this.route.params.subscribe((params) => {
      console.log(params['id'])
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
       this.imageUrl = productDetail.url
  }

}
