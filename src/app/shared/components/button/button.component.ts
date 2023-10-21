import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [IonicModule, NgClass]
})
export class ButtonComponent  implements OnInit {
  @Input()  title!: string;
  @Output() onBtnClick =  new EventEmitter<string>();
  @Input() class!: string;

  constructor() { }

  ngOnInit() {}
  //button click
  onClick(){
    this.onBtnClick.emit()
  }

}
