import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatBoxComponent } from 'src/app/shared/components/chat-box/chat-box.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports:[IonicModule, HeaderComponent,ReactiveFormsModule, ChatBoxComponent, NgIf, NgFor]
})
export class ChatComponent  implements OnInit {

  messageForm!: FormGroup;
  name:string = 'sender'
  currentUserId = 1
  //chats
  chats = [
    {id:1, sender:1, message:'hi '},
    {id:2, sender:2, message:'hey'},
    {id:1, sender:1, message:'hi '},
    {id:2, sender:2, message:'hi there fffff ffff fff kenneth  kjdkjkjd kjdfkjdkfjd kjfdkjfkjd kfjd'},
  ]



  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      textMessage:new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {}

  send(){
    console.log('meesgae', this.messageForm.get('textMessage')?.value);
  }

}
