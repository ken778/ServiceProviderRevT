import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';
import { StatusbarService } from 'src/app/unAuth/services/statusbar/statusbar.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    NgStyle,
    InputComponent,
    ButtonComponent,
    DropdownInputComponent,
    ModalComponent,
    CommonModule,
    RouterLink,
    TextAreaComponent,
    NgFor,
    NgIf,
  ],
})
export class HistoryComponent  implements OnInit {

  userId!: any;
  orderArray!: any;
  orderAvailable = false;
  totalNumberOfOrders!: number;

  constructor(  private _auth: AuthServiceService,
    private _orderSevve: OrderServiceService,
    private router: Router,private _statusbar : StatusbarService) { 
      this._statusbar.applyBackgroundColor();

    }

  ngOnInit() {
    this.getUserId()
  }

    //get userId
    getUserId() {
      this._auth.loggedInUser().subscribe((res) => {
        console.log(res?.uid);
        this.userId = res?.uid;
        //calling get orders functions
        this.getOrdersMade();
      });
    }
  
  //get cart items
  getOrdersMade() {
    this._orderSevve.getOrders(this.userId).subscribe({
      next: (order: any) => {
        // Filter orders based on userId
        this.orderArray = order.filter(
          (order: any) => order.storeKey === this.userId
        );
        console.log(this.orderArray);
        this.orderArray.sort((a:any, b:any) => this.orderArray.indexOf(b) - this.orderArray.indexOf(a));
        if (this.orderArray.length > 0) {
          this.orderAvailable = true;
          this.totalNumberOfOrders = this.orderArray.length;
          // //getting orders
          // this.getallOrders('Pending');
        } else {
          this.orderAvailable = false;
          this.totalNumberOfOrders = 0;
        }
      },
    });
  }

  //to order
  toOrder(id:any){
      console.log(id)
      this.router.navigate(['/order-details', id])
  }

}
