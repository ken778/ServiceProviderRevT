import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone:true,
  imports: [IonicModule, InputComponent, ButtonComponent, FooterComponent]
})
export class SignInComponent  implements OnInit {

  //variables
  email!: string;
  password!:string;

  formGroup = new FormGroup({
    email:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
 
  })

  constructor(private _auth: AuthServiceService, private router: Router) { }

  ngOnInit() {

  }

  login(){
    const data = {
      email: String(this.formGroup.get('email')?.value),
      password: String(this.formGroup.get('password')?.value),
    }
    this._auth.login(data).then((userCredential)=>{
        //Signed in 
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['/home'])
        
    })
    .catch((error)=>{
      console.log(error)
    })

    console.log('data from instence', this._auth.registerEmailInstance)
  }

}
