import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule]
})
export class PrintReportComponent  implements OnInit {

  pdfObj!: any;

  constructor() { }

  
  pdfDownload(){
  
       
  }
  

 
 

  ngOnInit() {}

}
