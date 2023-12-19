import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AuthServiceService } from '../services/auth/auth-service.service';

import {Database,set,ref,update, onValue} from '@angular/fire/database'
import { authUser, registerModule } from 'src/app/shared/models/interfaces/user/user.iterface';
import { NgIf } from '@angular/common';
import { ToastService } from '../services/toast/toast.service';
import { fchmod } from 'fs';
import { StatusbarService } from '../services/statusbar/statusbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[IonicModule, InputComponent,ButtonComponent, RouterLink, NgIf]
})
export class SignUpComponent  implements OnInit {

  //default profile pic 
   profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU'
   logoImage = 'assets/icons.png';

  //registration instance
  public registrationInstance = new registerModule()
  spinner = false;

  formGroup = new FormGroup({
    firstName:new FormControl('', [Validators.required]),
    lastName:new FormControl('', [Validators.required]),
    phoneNumber:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
  })

  constructor(private _auth: AuthServiceService,private database: Database, private _router: Router, private _toastServ: ToastService, private _statusbar : StatusbarService
    ) {
      this._statusbar.applyBackgroundColor();
     }

  ngOnInit() {
    
    console.log(this.spinner)
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
    if(this.formGroup.valid){
       // this.spinner = true;
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
      imageUrl: this.profilePic
    }
    this._auth.registerEmailInstance = userData,
    this._auth.register(String(authData.email), String(authData.password))
   
  //  this._router.navigate(['/sign-in'])
  this.spinner = true;
  setTimeout(() => {
    this._router.navigate(['/sign-in'])
    this.spinner = false;
   
  }, 2000);


    }else{
     this._toastServ.presentToast("Please fill all the fields", "danger")
    }
   
}






toLogin(){
  this._router.navigate(['/sign-in'])
}


}


