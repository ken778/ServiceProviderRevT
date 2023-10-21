import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss'],
  standalone:true,
  imports:[IonicModule, ReactiveFormsModule,NgClass]
})
export class DropdownInputComponent  implements OnInit {

  @Input() placeholder!: string;
  @Input() control = new FormControl();
  @Input() class!: string;
  @Input() iconName: string = '';
  @Input() label!: string;



  constructor() { }

  ngOnInit() {}

  customPopoverOptions2 = {
    subHeader: "Select your Title",
  };

}
