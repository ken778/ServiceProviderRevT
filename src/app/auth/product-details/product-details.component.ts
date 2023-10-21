import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone:true,
  imports:[CommonModule, IonicModule, InputComponent, ButtonComponent, HeaderComponent, DropdownInputComponent,TextAreaComponent]
})
export class ProductDetailsComponent  implements OnInit {


  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {}

}
