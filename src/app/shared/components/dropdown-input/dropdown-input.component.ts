import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss'],
  standalone:true,
  imports:[IonicModule, ReactiveFormsModule,NgClass, NgFor]
})
export class DropdownInputComponent  implements OnInit {

  @Input() placeholder!: string;
  @Input() control = new FormControl();
  @Input() class!: string;
  @Input() iconName: string = '';
  @Input() label!: string;
  @Input() options!: any[]; // Define a type that suits your options structure
  @Output() selectedValueChanged: EventEmitter<any> = new EventEmitter();


  selectedValue: any;
  constructor() { }

  ngOnInit() {}
  
  valueChanged() {
    this.selectedValueChanged.emit(this.selectedValue);
  }

  customPopoverOptions2 = {
    subHeader: "Select your Title",
  };

}
