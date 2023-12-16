import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';

@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.component.html',
  styleUrls: ['./prepare-order.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NgIf,
    NgFor,
    ModalComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    TextAreaComponent,
  ],
})
export class PrepareOrderComponent implements OnInit {
  public products!: any;
  public orders!: any;
  public orderStatus!: any;
  public currentOrderStatus!: any;
  buttonDisabled = true;
  constructor(
    private route: ActivatedRoute,
    private _orderServ: OrderServiceService,
    private _route: Router, private  _toastService: ToastService
  ) {}

  ngOnInit() {
    this.getOrderId();
  }

  //retrieve product details
  getOrderId() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.order(params['id']);
    });
  }

  //get clicked order
  order(orderId: any) {
    this._orderServ.getSingleOrder(orderId).subscribe({
      next: (order: any) => {
        console.log('order', order);
        this.orders = order;
        this.currentOrderStatus = order[0].orderStatus
        this.products = order[0].product;
        console.log(this.products);
      },
    });
  }
  
  prepareOrder(id: any) {
    this.orderStatus = "Preparing"
    console.log('item id', id);
    const data = {
      orderStatus: this.orderStatus
    };
    this._orderServ.prepareItems(id, data).then((res) => {
      console.log('updated')
      this._toastService.presentToast( "Preparing order", "success")
      this._route.navigate(['/home'])
    }).catch((error)=>{
      console.log(error)
    })
  }

  dispatch(id: any) {
    this.orderStatus = "Dispatching"
    console.log('item id', id);
    const data = {
      orderStatus: this.orderStatus
    };
    this._orderServ.prepareItems(id, data).then((res) => {
      console.log('updated')
      this._toastService.presentToast( "Order out for delivery", "success")
      this._route.navigate(['/home'])
    }).catch((error)=>{
      console.log(error)
    })
  }
  dispatched(id: any) {
    this.orderStatus = "Dispatched"
    console.log('item id', id);
    const data = {
      orderStatus: this.orderStatus
    };
    this._orderServ.prepareItems(id, data).then((res) => {
      console.log('updated')
      this._toastService.presentToast( "Order completed", "success")
      this._route.navigate(['/home'])
    }).catch((error)=>{
      console.log(error)
    })
  }
}
