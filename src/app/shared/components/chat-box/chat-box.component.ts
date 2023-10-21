import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone:true,
  imports:[IonicModule,NgIf, NgFor]
})
export class ChatBoxComponent  implements OnInit {
  
  @Input() chat:any;
  @Input() current_user_id: any;

  constructor() { }

  ngOnInit() {
    console.log(this.chat)
  }

}
