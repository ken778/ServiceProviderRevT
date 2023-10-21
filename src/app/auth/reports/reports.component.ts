import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
// const { Filesystem } = Plugins;
// import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';

import { Filesystem, Directory, Encoding, ReadFileOptions } from '@capacitor/filesystem';


const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { WriteFileOptions } from 'fs';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, ReactiveFormsModule],
})
export class ReportsComponent implements OnInit {
  constructor(
    private _Route: Router,
    private fb: FormBuilder,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {}

  myForm!: FormGroup;
  pdfObj!: any;
  base64Image = null;
  photoPreview = null;
  logoData: any;

  textArray = [
    'Text for the first row of the table1.',
    'Text for the second row of the table2.',
    'Text for the third row of the table3.',
    'Text for the third row of the table3.',
    'Text for the third row of the table3.',
    // Add more text items as needed
  ];

  data = [
    {
      date: '1989-11-30',
      quantity: 6,
      oerderID: '57f61426-e45c-3357-aa92-650e99f861e7',
      Status: false,
      cost: 114132,
    },
    {
      date: '1986-03-23',
      quantity: 7,
      oerderID: 'd94a5e6a-be0b-3a8d-a819-8fc69a585ce9',
      Status: false,
      cost: 68666102,
    },
    {
      date: '2020-01-19',
      quantity: 5,
      oerderID: '177e20f2-202f-345b-b80c-68a69614112c',
      Status: false,
      cost: 1084577,
    },
    {
      date: '2017-12-29',
      quantity: 6,
      oerderID: '2b2e30a0-96bb-37cf-bdf1-eb5f62fa079d',
      Status: true,
      cost: 19,
    },
    {
      date: '1976-09-06',
      quantity: 1,
      oerderID: 'a1594878-2de6-3f09-b034-56b7a15156d4',
      Status: true,
      cost: 971298,
    },
    {
      date: '1991-05-24',
      quantity: 0,
      oerderID: 'b4886a04-c1e5-37a6-b5ea-9b9544fd5e9d',
      Status: false,
      cost: 453966474,
    },
  ];

  ngOnInit() {
    this.myForm = this.fb.group({
      showLogo: true,
      from: 'kenneth',
      to: 'thabang',
      text: 'TEST',
    });
    this.loadLocalAssetsToBase64();

    this.data.map((res)=>{
     console.log(res.oerderID)
    })

    Filesystem.requestPermissions();
  }

  loadLocalAssetsToBase64() {
    this.http
      .get('./assets/logo.png', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoData = reader.result;
        };
        reader.readAsDataURL(res);
      });
  }

  createPdf() {
    const formValue = this.myForm.value;
    let logo = {};
    if (formValue.showLogo) {
      logo = { image: this.logoData, width: 50 };
    }

    const docDefinition = {
      watermark: {
        text: 'Rev Tracking',
        color: 'green',
        opacity: 0.2,
        bold: true,
      },
      content: [
        {
          columns: [
            {
              text: new Date().toTimeString(),
              alignment: 'right',
            },
          ],
        },

        {
          image: this.logoData,
          width: 100,
          height: 100,
        },
        { text: 'Farm Store', style: 'subheader', margin: [0, 20, 0, 8] },

        {
          columns: [
            { text: 'JANUARY REPORT', style: 'header', alignment: 'right',  margin: [0, 20, 0, 8] },
          ],
        },

        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [
                { text: 'Date', style: 'tableHeader' },
                { text: 'quantity', style: 'tableHeader' },
                { text: 'OrderiD', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' },
                { text: 'Cost', style: 'tableHeader' },
              ],
              ...this.data.map((dataItem) => [
                dataItem.date,
                dataItem.quantity.toString(), // Convert to string if needed
                dataItem.oerderID,
                dataItem.Status,
                "R" + dataItem.cost.toString()  // Convert to string if needed
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
      // content:[
      //   {
      //     colums:[
      //        logo,
      //        {
      //         text:new Date().toTimeString(),
      //         alignment:'right',
      //        }
      //     ]
      //   },
      //   {text:'REPORT', style:'header'},
      //   {
      //     colums:[
      //       {
      //           width:'50%',
      //           text:'From',
      //           style:'subheader'
      //       },
      //       {
      //           width:'50%',
      //           text:'To',
      //           style:'subheader'
      //       },
      //     ]
      //   },
      //   {
      //     colums:[
      //       {
      //         width:'50%',
      //         text:formValue.from
      //       },
      //       {
      //         width:'50%',
      //         text:formValue.to
      //       },
      //     ]
      //   }

      // ],
      // styles:{
      //   header:{
      //     fontSize:18,
      //     bold:true,
      //     margin:[0,15,0,0]
      //   },
      //   subheader:{
      //     fontSize:14,
      //     bold:true,
      //     margin:[0,15,0,0]

      //   }
      // }
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
  }


  //download
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBase64(async(data: any)=>{
        let path = `pdf/report_${Date.now()}.pdf`;
        await Filesystem.writeFile({
          path,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
          recursive:true,
          data:data
        }).then((res)=>{
          console.log(res);
          alert('created')
        },(err)=>{
           alert(err)
        }
        )

      })
    } else {
      this.pdfObj.download();
    }
  }



   writeSecretFile = async()=>{
       
        if(window.confirm(' do you want to create file')){
          var text =  window.prompt('Enter text you wnat ');
       
      await Filesystem.writeFile({
            path:"myfile/myfile.txt",
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            recursive:true,
            data:'this ome '
          }).then((res)=>{
            console.log(res);
            alert(res)
          },(err)=>{
             alert(err)
          }
          )
        }
  };

  createAndDownload(){
    this.createPdf()
    this.downloadPdf()
  }

  getreport(event: any) {
    console.log(event.target.value);
  }
  navigateToPdf() {
    this._Route.navigate(['/print-report']);
  }
}

