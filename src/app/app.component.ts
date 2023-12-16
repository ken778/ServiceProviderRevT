import { Component } from '@angular/core';
import { AuthServiceService } from './unAuth/services/auth/auth-service.service';
import { Router } from '@angular/router';
import { StatusbarService } from './unAuth/services/statusbar/statusbar.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authSer: AuthServiceService, private router: Router, private _statusbar : StatusbarService) {
    this._statusbar.applyBackgroundColor();
    // this.authSer.loggedInUser().subscribe({
    //   next:(user)=>{
    //    console.log( user)
    //    if(user){
    //        this.router.navigate(['/home'])
    //    }else{
    //     this.router.navigate(['/sign-in'])
    //    }
    //   }
    // })

    const user: any = JSON.parse(<string>localStorage.getItem("user"));
    
    if(user!=null){
      this.router.navigate(['/home'])
      console.log('user found')
    }else{
      this.router.navigate(['/sign-in'])
      console.log('user not found')
    }
  }
}
