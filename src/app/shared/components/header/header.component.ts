import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input('Heading') Heading = '';
  @Input() routerLink!: string | any[];

  hideBackButton: boolean = false;

  constructor() {}

  ngOnChanges() {
    if (this.Heading == 'Dashboard' || this.Heading=='Chats' || this.Heading=='Profile' || this.Heading=='Reports' || this.Heading=='Products') {  
      this.hideBackButton = true;
      console.log('status', this.hideBackButton);
    }
  }
  back(){
    window.history.back();
  }

  ngOnInit() {}
}
