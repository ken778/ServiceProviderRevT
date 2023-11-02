import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { from, map, of, pipe } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { authUser } from 'src/app/shared/models/interfaces/user/user.iterface';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';

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

 
  //tabs
  tabs = ['Pending', 'Dispatched', 'Cancelled'];
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
  filteredOrders$: any = [];

  constructor(private _auth: AuthServiceService) {}

  ngOnInit() {
    this.totalDispatched =  this.accumulateOrders('Dispatched');
    this.totaPending = this.accumulateOrders('Pending');
   console.log('totalOrders:', this.totaPending)
    //initial tab
    this.activeTab = 'Pending';
    this.getOrders('Pending');

    this.oders$.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (data) => {
        console.log(data);
      },
    });

  

  }

  //seceted tab
  selectTab(tab: any) {
    console.log(tab);
    this.activeTab = tab;
    this.getOrders(tab);
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

  //getting number of orders
  accumulateOrders(status: any):any {
    const filtred = this.orders.filter((res) => res.status === status);
    return filtred.length
  }


  
  
}
