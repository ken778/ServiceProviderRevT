import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone:true,
  imports: [IonicModule, InputComponent, ButtonComponent, FooterComponent]
})
export class SignInComponent  implements OnInit {

  formGroup = new FormGroup({
  
    phoneNumber:new FormControl('', [Validators.required]),
 
  })

  constructor() { }

  ngOnInit() {}

}
