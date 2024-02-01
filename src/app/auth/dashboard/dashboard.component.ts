import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { from, map, of, pipe } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { authUser } from 'src/app/shared/models/interfaces/user/user.iterface';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';
import { StatusbarService } from 'src/app/unAuth/services/statusbar/statusbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, NgFor, CommonModule, NgStyle],
})
export class DashboardComponent implements OnInit {
  //variables
  totaPending!: any;
  totalDispatched!: any;
  preparing!: any
  userId!: any;
  orderArray!: any;
  orderAvailable = false;
  totalNumberOfOrders!: number;
  //tabs
  tabs = ['Pending', 'Preparing', 'Dispatching','Dispatched'];
  //oders


  //tabs
  tabs$ = of(this.tabs);
  activeTab!: string;
  //orders

  filterOrders = of(this.orderArray);
  filteredOrders$: any = [];

  constructor(
    private _auth: AuthServiceService,
    private _orderSevve: OrderServiceService,
    private router: Router,
    private _statusbar : StatusbarService
  ) {
    this._statusbar.applyBackgroundColor();
  }

  ngOnInit() {
  
    //initial tab
    this.activeTab = 'Pending';
    // this.getOrders('Pending');
    //get loggedin user
    this.getUserId();
  }

  //seceted tab
  selectTab(tab: any) {
    this.activeTab = tab;
    this.getallOrders(tab);
  }



  //from firebase
  getallOrders(orderStatu: any) {
    if (this.orderAvailable) {
      this.filteredOrders$ = this.orderArray.filter(
        (product: any) => product.orderStatus === orderStatu
      );
      this.filteredOrders$.sort((a:any, b:any) => this.filteredOrders$.indexOf(b) - this.filteredOrders$.indexOf(a));
    }
  }

  //getting number of orders
  accumulateOrders(status: any): any {
    const filtred = this.orderArray.filter((res:any) => res.orderStatus === status);
    
    return filtred.length;
  }

 

  //get userId
  getUserId() {
    this._auth.loggedInUser().subscribe((res) => {
      console.log(res?.uid);
      this.userId = res?.uid;
      //calling get orders functions
      this.getOrdersMade();
      //accumulate totals
      // this.totalDispatched = this.accumulateOrders('Dispatched');
      // this.totaPending = this.accumulateOrders('Pending');

     
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
        console.log(order);
        if (this.orderArray.length > 0) {
          this.orderAvailable = true;
          this.totalNumberOfOrders = this.orderArray.length;

          //getting orders
          this.getallOrders('Pending');

          //accumulate
     
         this.totaPending = this.accumulateOrders('Pending')
         this.totalDispatched =  this.accumulateOrders('Dispatched')
         this.preparing =  this.accumulateOrders('Preparing')

        } else {
          this.orderAvailable = false;
          this.totalNumberOfOrders = 0;
        }
      },
    });
  }

  toOrder(id:any){
    console.log(id)
    this.router.navigate(['/order', id])
     
  }
}
