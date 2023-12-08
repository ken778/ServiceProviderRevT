import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf,NgFor, ModalComponent, HeaderComponent, InputComponent, ButtonComponent, TextAreaComponent]
})
export class OrderComponent  implements OnInit {

  //variables
  orderId!: any;
  products!: any;
  constructor(private route: ActivatedRoute, private _orderServ: OrderServiceService) { }


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
        this.products = order[0].product
        console.log(this.products)
       
      }
    });
  }
  prepareOrder(){
      console.log('preparing order')
  }

 

}
