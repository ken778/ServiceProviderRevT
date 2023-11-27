import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonButton, IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    InputComponent,
    ButtonComponent,
    FooterComponent,
    NgIf,
  ],
})
export class SignInComponent implements OnInit {
  //variables
  email!: string;
  password!: string;
  logoImage = 'assets/icons.png';
  spinner = false;

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _auth: AuthServiceService,
    private router: Router,
    private _toast: ToastService
  ) {}

  ngOnInit() {}

  login() {
    if (this.formGroup.valid) {
      this.spinner = true;
      const data = {
        email: String(this.formGroup.get('email')?.value),
        password: String(this.formGroup.get('password')?.value),
      };
      this._auth
        .login(data)
        .then((userCredential) => {
          //Signed in
          const user = userCredential.user;
          console.log(user);

          setTimeout(() => {
            this.router.navigate(['/home']);
            this.spinner = false;
          }, 2000);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === 'auth/user-not-found') {
            this._toast.presentToast('User not found', 'danger');
          }
          if (error.code === 'auth/wrong-password') {
            this._toast.presentToast('wrong-password', 'danger');
          }
          if (error.code === 'auth/too-many-requests') {
            this._toast.presentToast('Access to this account has been temporarily disabled due to many failed login attempts', 'danger');
          }
          this.spinner = false;
        });

      console.log('data from instence', this._auth.registerEmailInstance);
    } else {
      this._toast.presentToast('Please fill all the fields', 'danger');
    }
  }
  toSignUp() {
    this.router.navigate(['/sign-up']);
  }
}


