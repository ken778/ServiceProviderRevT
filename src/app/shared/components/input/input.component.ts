import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone:true,
  imports:[NgClass, ReactiveFormsModule, IonicModule]
})
export class InputComponent  implements OnInit {

  @Input() placeholder!: string;
  @Input() control = new FormControl();
  @Input() class!: string;
  @Input() iconName: string = '';
  



  constructor() { }

  ngOnInit() {}

}
