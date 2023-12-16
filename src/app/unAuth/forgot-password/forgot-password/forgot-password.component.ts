import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    InputComponent,
    ButtonComponent,
    FooterComponent,
    NgIf,
    RouterLink
  ],
})
export class ForgotPasswordComponent  implements OnInit {

  
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(  private _auth: AuthServiceService,
    private router: Router,
    private _toast: ToastService) { }

  ngOnInit() {}

  resetPassword(){
 console.log(this.formGroup.get('email')?.value)
  
     this._auth.forgotPassword(this.formGroup.get('email')?.value).then(()=>{
      this._toast.presentToast('Paasword reset link sent to your email', 'success');
     })
  }

}
