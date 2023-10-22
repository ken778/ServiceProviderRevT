import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AuthServiceService } from '../services/auth/auth-service.service';

import {Database,set,ref,update, onValue} from '@angular/fire/database'
import { authUser, registerModule } from 'src/app/shared/models/interfaces/user/user.iterface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[IonicModule, InputComponent,ButtonComponent, RouterLink]
})
export class SignUpComponent  implements OnInit {

  //registration instance
  public registrationInstance = new registerModule()

  formGroup = new FormGroup({
    firstName:new FormControl('', [Validators.required]),
    lastName:new FormControl('', [Validators.required]),
    phoneNumber:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  })

  constructor(private _auth: AuthServiceService,private database: Database, private _router: Router) { }

  ngOnInit() {
   this._auth.getUsers().subscribe({
    next: (snapshot) => {
        console.log(snapshot)
    },
    error: (error) => {
      console.log(error);
    }
   })
    
  }

 
  
  

  signUp(){
    console.log('i am clicked')
    console.log(this.formGroup.value)

    //sign up details
    const authData = {
       email:this.formGroup.get('email')?.value,
       password:this.formGroup.get('password')?.value
    }

    //data to save to database
    const userData = {
      first_name:  String(this.formGroup.get('firstName')?.value),
      last_name: String(this.formGroup.get('lastName')?.value),
      email_address:String(this.formGroup.get('email')?.value),
      phone_number:String(this.formGroup.get('phoneNumber')?.value),
      city:String(this.formGroup.get('city')?.value),
      
    }
    this._auth.registerEmailInstance = userData,
    this._auth.register(String(authData.email), String(authData.password))
   
 

   this._router.navigate(['/sign-in'])
 

}

}


