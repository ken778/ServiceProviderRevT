import { CommonModule, NgStyle } from '@angular/common';
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
import { RouterLink } from '@angular/router';

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
    NgStyle
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

  //forn input
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
  });

  //products
  products = [
    {
      soldOut: 5,
      inStock: 1,
      quantity: 9,
      productName: 'delectus',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: 'b558c691-4eda-3f41-898a-0f8612a337fa',
    },
    {
      soldOut: 5,
      inStock: 6,
      quantity: 6,
      productName: 'illo',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '0a6954af-a2c6-300d-bd69-6bb4d4753352',
    },
    {
      soldOut: 0,
      inStock: 2,
      quantity: 5,
      productName: 'aut',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '8713717f-2c8f-3041-8b15-b404f34435a6',
    },
    {
      soldOut: 6,
      inStock: 1,
      quantity: 1,
      productName: 'tempore',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '23b69856-0c80-3f3d-a91d-9e8a4c751144',
    },
    {
      soldOut: 3,
      inStock: 3,
      quantity: 4,
      productName: 'voluptatem',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '13b372ec-1a3e-3128-831e-c3c4116f9bec',
    },
    {
      soldOut: 0,
      inStock: 8,
      quantity: 2,
      productName: 'possimus',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '13e5d1da-a874-329c-a59f-9a57261c774a',
    },
    {
      soldOut: 2,
      inStock: 7,
      quantity: 7,
      productName: 'fugit',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '6aab319b-04a2-3fb8-bceb-8ebafc80ef58',
    },
    {
      soldOut: 9,
      inStock: 6,
      quantity: 7,
      productName: 'voluptatem',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '99b77e1d-9501-31ff-b4c7-232f3011484f',
    },
    {
      soldOut: 6,
      inStock: 3,
      quantity: 2,
      productName: 'eaque',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '29fa53f8-d799-3746-a428-b4252c7ac167',
    },
    {
      soldOut: 6,
      inStock: 2,
      quantity: 2,
      productName: 'sit',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '0a7986f6-27b7-3595-ab8d-7439ee823e89',
    },
    {
      soldOut: 2,
      inStock: 7,
      quantity: 5,
      productName: 'blanditiis',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '6b17c7d2-2b2b-36de-8023-a126a4cba2d1',
    },
    {
      soldOut: 0,
      inStock: 5,
      quantity: 5,
      productName: 'facere',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: 'f3f4679b-4c9d-3908-9a60-21617952abf8',
    },
    {
      soldOut: 5,
      inStock: 0,
      quantity: 6,
      productName: 'odio',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '215c2eb5-56dc-380e-b3a5-c0922399bfe9',
    },
    {
      soldOut: 1,
      inStock: 7,
      quantity: 3,
      productName: 'ea',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '5f15c3b4-f263-3ee4-95cb-096d7b45940b',
    },
    {
      soldOut: 6,
      inStock: 4,
      quantity: 8,
      productName: 'est',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: 'b63ef9e1-a168-3caa-bc23-a61f2152beb0',
    },
    {
      soldOut: 1,
      inStock: 8,
      quantity: 4,
      productName: 'reiciendis',
      image: 'https://static.vecteezy.com/system/resources/previews/005/539/606/original/3d-realistic-transparent-isolated-set-whole-and-slice-of-watermelon-watermelon-in-a-splash-of-juice-with-drops-free-vector.jpg',
      id: '227bc167-d097-3599-a4c3-fb56f16b1241',
    },
  ];

  //streams
  Category = of(Category);
  products$ = of(this.products);

  constructor() {}

  ngOnInit() {}

  customPopoverOptions2 = {
    subHeader: 'Select your Title',
  };
}
