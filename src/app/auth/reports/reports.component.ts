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
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { OrderServiceService } from 'src/app/unAuth/services/orders/order-service.service';
import { StatusbarService } from 'src/app/unAuth/services/statusbar/statusbar.service';

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
    private fileOpener: FileOpener,
    private _auth: AuthServiceService,
    private _orderSevve: OrderServiceService,
    private _statusbar : StatusbarService
  ) {
    this._statusbar.applyBackgroundColor();
    this.getUserId()
  }

  myForm!: FormGroup;
  pdfObj!: any;
  base64Image = null;
  photoPreview = null;
  logoData: any;

  userId!: any;
  orderArray!: any;
  orderAvailable = false;
  totalNumberOfOrders!: number;
  overallTotalAmount!:any;
  storeDetails!: any;

  month!: any;
  reportMonth!: any;

  textArray = [
    'Text for the first row of the table1.',
    'Text for the second row of the table2.',
    'Text for the third row of the table3.',
    'Text for the third row of the table3.',
    'Text for the third row of the table3.',
    // Add more text items as needed
  ];



  ngOnInit() {
    console.log('report report')
    this.myForm = this.fb.group({
      showLogo: true,
      from: 'kenneth',
      to: 'thabang',
      text: 'TEST',
    });
    this.loadLocalAssetsToBase64();
    Filesystem.requestPermissions();
 
  }

    //testing 
    filterOrdersByMonth(orderArray: any[], targetMonth: string): any[] {
      const filteredOrders = orderArray.filter((order: any) => {
        // Check if created_at is a string before splitting
        if (typeof order.created_at === 'string') {
          const orderMonthString = order.created_at.split(' ')[1]; // Extract the month part
          return orderMonthString === targetMonth;
        }
        return false; // If created_at is not a string, exclude from filtering
      });
  
      return filteredOrders;
    }
    filteredOrders: any[] = [];
    
  

      //get userId
      getUserId() {
        this._auth.loggedInUser().subscribe((res) => {
          console.log(res?.uid);
          this.userId = res?.uid;
          //calling get orders functions
          this.getOrdersMade();
          this.getStoreDetails(this.userId)
          // const targetMonth = 'Jan'; // Replace with your desired month
          
        });
      }

      
  //get store details
  getStoreDetails(id:any){
    this._auth.getStoreDetails(id).subscribe({
      next: (res) => {
        console.log('details', res);
        this.storeDetails = res
        console.log(this.storeDetails)
      },
      error: (error) => {
        console.log('while fetching details', error);
      },
    });
  }
    
    //get cart items
    getOrdersMade() {
      this._orderSevve.getOrders(this.userId).subscribe({
        next: (order: any) => {
          // Filter orders based on userId
          this.orderArray = order.filter(
            (order: any) => order.storeKey === this.userId
          );
          console.log(this.orderArray);


          //testing 
          console.log(this.orderArray[2].created_at.toLocaleString('en-US', { month: 'short' }))
          const date = new Date(this.orderArray[2].created_at);
          const monthString = date.toLocaleString('en-US', { month: 'short' });
          console.log(monthString);

          const filtredOrder = this.orderArray.filter((res:any)=>res.createdAt ==='Dec')

          
          this.orderArray.sort((a:any, b:any) => this.orderArray.indexOf(b) - this.orderArray.indexOf(a));
          if (this.orderArray.length > 0) {
            this.orderAvailable = true;
            this.totalNumberOfOrders = this.orderArray.length;
            // //getting orders
            // this.getallOrders('Pending');
          } else {
            this.orderAvailable = false;
            this.totalNumberOfOrders = 0;
          }
        },
      });
    }

  loadLocalAssetsToBase64() {
    this.http
      .get('assets/icons.png', { responseType: 'blob' })
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
        { text: `${this.storeDetails.store_name} store` , style: 'subheader', margin: [0, 20, 0, 8] },

        {
          columns: [
            { text: `Month: ${this.reportMonth}` , style: 'header', alignment: 'right',  margin: [0, 20, 0, 8] },
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
                { text: 'Province', style: 'tableHeader' },
                { text: 'Cost', style: 'tableHeader' },
              ],
              ...this.filteredOrders.map((dataItem) => [
                dataItem.created_at,
                dataItem.postalCode.toString(), // Convert to string if needed
                dataItem.orderID,
                dataItem.orderStatus,
                dataItem.province,
                "R" + dataItem.amount.toString()  // Convert to string if needed
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

   //accumulate total amount of cart items
   accumulateTotalAmount() {
    const overallTotal = this.filteredOrders.reduce(
      (accumulator, currentItem) => {
        return accumulator + Number(currentItem.amount);
      },
      0
    );
    this.overallTotalAmount = overallTotal.toFixed(2);
    console.log("accumulated total amount", this.overallTotalAmount);
    this.totalNumberOfOrders = this.filteredOrders.length
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
  //write file
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

  //create PDF
  createAndDownload(){
    this.createPdf()
    this.downloadPdf()
  }

  getreport(event: any) {
    console.log(event.target.value);  
    const date = new Date(event.target.value);
    const monthString = date.toLocaleString('en-US', { month: 'short' });
    console.log(monthString);
    this.month = monthString;
   

    const dateString = event.target.value;
const dateObject = new Date(dateString);

// Convert to a readable month format
const readableMonth = dateObject.toLocaleString('en-US', {
  month: 'long'
});
this.reportMonth = readableMonth


    this.filteredOrders = this.filterOrdersByMonth(this.orderArray, monthString);  
          console.log(this.filteredOrders);

          this.accumulateTotalAmount()
  }

  //filter orders based on month
  filterorderByMonth(month:any, ordersArray:any){
      
  }

  //navigate
  navigateToPdf() {
    this._Route.navigate(['/print-report']);
  }
}

