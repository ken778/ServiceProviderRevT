import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, RouterLink, NgFor, NgIf, CommonModule],
})
export class MessageComponent implements OnInit {
  constructor(private _route: Router) {}

  users = [
    {
      id: '61656698-82b8-332c-be30-6e0fba5302d6',
      name: 'Champlin',
      message: 'Et sed modi et.',
      image: 'https://i.pravatar.cc/381',
      date: '14:27:18',
    },
    {
      id: '28c97db5-dc54-3580-aeb6-d31e2e0b88c0',
      name: 'Douglas',
      message: 'Quos rerum voluptates atque deleniti doloremque est ipsam.',
      image: 'https://i.pravatar.cc/382',
      date: '09:18:09',
    },
    {
      id: '8fee654b-7ca9-342d-ad1f-4b5913d96e4a',
      name: 'Connelly',
      message: 'Molestiae odio ipsa id qui distinctio quae excepturi.',
      image:
        'https://i.pravatar.cc/387',
      date: '07:48:59',
    },
    {
      id: '0f8b9b8b-7ac7-36c2-a427-ab33bb6f6ebd',
      name: 'Sanford',
      message: 'A consequatur sit maxime deleniti eius est nesciunt.',
      image: 'https://i.pravatar.cc/378',
      date: '03:00:51',
    },
  ];
  
  users$ = of(this.users)

  ngOnInit() {}

  navigate() {
    this._route.navigate(['/chat']);
  }
}
