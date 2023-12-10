import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { from, map, of, pipe } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { authUser } from 'src/app/shared/models/interfaces/user/user.iterface';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, NgFor, CommonModule, NgStyle],
})
export class DashboardComponent implements OnInit {
  //variables
  totaPending!: string;
  totalDispatched!: string;
  userId!: any;
  orderArray!: any;
  orderAvailable = false;
  totalNumberOfOrders!: number;
  //tabs
  tabs = ['Pending', 'Preparing', 'Dispatching','Dispatched'];
  //oders
  orders = [
    {
      name: 'Jeremy',
      lastName: 'Braun',
      orderNumber: 16177955218,
      totalAmount: 45879430,
      quantity: 6,
      status: 'Pending',
    },
    {
      name: 'Clint',
      lastName: 'Wiza',
      orderNumber: 16784673090,
      totalAmount: 475101720,
      quantity: 1,
      status: 'Pending',
    },
    {
      name: 'Mohammad',
      lastName: 'Emard',
      orderNumber: '+1-346-329-4527',
      totalAmount: 795764597,
      quantity: 3,
      status: 'Dispatched',
    },
    {
      name: 'Alec',
      lastName: 'Braun',
      orderNumber: '458-991-5331',
      totalAmount: 28633919,
      quantity: 1,
      status: 'Cancelled',
    },
    {
      name: 'Vidal',
      lastName: 'Corkery',
      orderNumber: '+1.551.279.7068',
      totalAmount: 14,
      quantity: 5,
      status: 'Cancelled',
    },
    {
      name: 'Rowland',
      lastName: 'Hagenes',
      orderNumber: '1-470-916-4978',
      totalAmount: 6397536,
      quantity: 2,
      status: 'Pending',
    },
    {
      name: 'Mathew',
      lastName: 'Wilderman',
      orderNumber: '859-870-5424',
      totalAmount: 96635,
      quantity: 9,
      status: 'Cancelled',
    },
    {
      name: 'Lavern',
      lastName: 'VonRueden',
      orderNumber: '(332) 557-8799',
      totalAmount: 4844800,
      quantity: 5,
      status: 'Dispatched',
    },
    {
      name: 'Gerson',
      lastName: 'Klein',
      orderNumber: '601-572-2913',
      totalAmount: 2,
      quantity: 3,
      status: 'Dispatched',
    },
    {
      name: 'Khalid',
      lastName: 'Kunze',
      orderNumber: '1-380-386-6466',
      totalAmount: 14839474,
      quantity: 1,
      status: 'Dispatched',
    },
  ];

  //tabs
  tabs$ = of(this.tabs);
  activeTab!: string;
  //orders
  oders$ = of(this.orders);
  filterOrders = of(this.orderArray);
  filteredOrders$: any = [];

  constructor(
    private _auth: AuthServiceService,
    private _orderSevve: OrderServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.totalDispatched = this.accumulateOrders('Dispatched');
    this.totaPending = this.accumulateOrders('Pending');
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

  //filter
  getOrders(status: any) {
    this.oders$
      .pipe(map((res) => res.filter((order) => order.status === status)))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.filteredOrders$ = data;
         
        },
        error: (error) => {
          console.log(error);
        },
      });
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
    const filtred = this.orders.filter((res) => res.status === status);
    
    return filtred.length;
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
        console.log(order);
        if (this.orderArray.length > 0) {
          this.orderAvailable = true;
          this.totalNumberOfOrders = this.orderArray.length;

          //getting orders
          this.getallOrders('Pending');
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
