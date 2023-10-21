import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule]
})
export class TextAreaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
