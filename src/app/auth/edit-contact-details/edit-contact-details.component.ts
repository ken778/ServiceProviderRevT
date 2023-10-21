import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';

@Component({
  selector: 'app-edit-contact-details',
  templateUrl: './edit-contact-details.component.html',
  styleUrls: ['./edit-contact-details.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent]
 })
export class EditContactDetailsComponent  implements OnInit {


   //styles
   modalStyle={
    '--height': 'auto',
  }
  
  constructor() { }

  ngOnInit() {}

}
