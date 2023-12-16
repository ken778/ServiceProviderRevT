import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
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
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf,NgFor, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent, NgClass]
})
export class OrderComponent  implements OnInit {

  cancelButton = {
   '--background':'#ff7251',
    'height':'40px ',
    
  }
  //variables
  orderId!: any;
  products!: any;
  public orderObject:any;
  orderStatus: any;
  constructor(private route: ActivatedRoute, private _orderServ: OrderServiceService, private _route: Router, private  _toastService: ToastService) { }


  ngOnInit() {
    this.getOrderId()
    
  }

    //retrieve product details
    getOrderId(){
      this.route.params.subscribe((params) => {
        console.log(params['id'])
      this.order(params['id'])
      })
    }

  //get clicked order
  order(orderId: any) {
    this._orderServ.getSingleOrder(orderId).subscribe({
      next: (order: any) => {
        console.log('order', order)
        this.orderObject = order
        this.orderStatus = order[0].orderStatus
        this.products = order[0].product
        console.log(this.products)
        console.log(this.orderStatus)
       
      }
    });
  }

  // prepareOrder(id:any){
   
  //    const updataOrderData = {
  //     description: this.products.description,
  //     product: this.products.product,
  //     id: this.products.id,
  //     productId: this.products.productId,
  //     productImage: this.products.productImage,
  //     product_price:this.products.product_price,
  //     quantity: this.products.quantity,
  //     ref: this.products.ref,
  //     status: 'PREPARING',
  //     store_key: this.products.store_key,
  //     total:this.products.total,
  //     userId: this.products.userId,

  //    }
       
  //     console.log('preparing order', id)
  // }

 

  toOrder(id:any){
    console.log(id)
    this._route.navigate(['/prepare-order', id])
     
  }

  cancel(id: any) {
    this.orderStatus = "Cancelled"
    console.log('item id', id);
    const data = {
      orderStatus: this.orderStatus
    };
    this._orderServ.prepareItems(id, data).then((res) => {
      console.log('updated')
      this._toastService.presentToast( "Order cancelled", "success")
       this._route.navigate(['/home'])
    }).catch((error)=>{
      console.log(error)
    })
  }
}
