import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule,ReactiveFormsModule]
})
export class TextAreaComponent  implements OnInit {
  @Input() placeholder!: string;
  @Input() control = new FormControl();
  @Input() class!: string;
  @Input() iconName: string = '';

  constructor() { }

  ngOnInit() {}

}
