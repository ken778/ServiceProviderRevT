import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports:[IonicModule, NgStyle]

})
export class ModalComponent  implements OnInit {
  modelStyle = {
    '--height': 'auto'
  }
  constructor() { }

  ngOnInit() {}

}
