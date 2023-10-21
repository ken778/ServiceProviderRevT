import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone:true,
  imports: [IonicModule],
})
export class FooterComponent  implements OnInit {

  @Input() content!: string;
  @Input() class!:string;

  constructor() { }

  ngOnInit() {}

}
