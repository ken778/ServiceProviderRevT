import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[IonicModule, InputComponent,ButtonComponent, RouterLink]
})
export class SignUpComponent  implements OnInit {

  formGroup = new FormGroup({
    firstName:new FormControl('', [Validators.required]),
    lastName:new FormControl('', [Validators.required]),
    phoneNumber:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit() {}

  signIn(){
    console.log('i am clicked')
    console.log(this.formGroup.value)
  }

}
