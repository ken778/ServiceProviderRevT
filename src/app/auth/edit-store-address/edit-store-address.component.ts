import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

@Component({
  selector: 'app-edit-store-address',
  templateUrl: './edit-store-address.component.html',
  styleUrls: ['./edit-store-address.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf, HeaderComponent, ButtonComponent, InputComponent]
})
export class EditStoreAddressComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
