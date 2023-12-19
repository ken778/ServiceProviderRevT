import { NgStyle, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownInputComponent } from 'src/app/shared/components/dropdown-input/dropdown-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TextAreaComponent } from 'src/app/shared/components/text-area/text-area.component';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';
import { StatusbarService } from 'src/app/unAuth/services/statusbar/statusbar.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
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
export class OrderDetailsComponent  implements OnInit {

  orders!:any;

  constructor(  private route: ActivatedRoute, private _orderServ: OrderServiceService, private router: Router,private _statusbar : StatusbarService) { 
    this._statusbar.applyBackgroundColor();
  }

  ngOnInit() {
    this.getOrderId()
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
        this.orders = order[0];
     
      },
    });
  }


  goBack(){
    this.router.navigate(['/home/history']);
  }
}
