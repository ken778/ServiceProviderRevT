import { Component } from '@angular/core';
import { AuthServiceService } from './unAuth/services/auth/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authSer: AuthServiceService, private router: Router) {
    
    this.authSer.loggedInUser().subscribe({
      next:(user)=>{
       console.log( user)
       if(user){
           this.router.navigate(['/home'])
       }else{
        this.router.navigate(['/sign-in'])
       }
      }
    })
  }
}
