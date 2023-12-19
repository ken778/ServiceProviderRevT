import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/unAuth/services/location/location.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  storeAddressModule } from 'src/app/shared/models/interfaces/user/user.iterface';
import { AuthServiceService } from 'src/app/unAuth/services/auth/auth-service.service';
import { ToastService } from 'src/app/unAuth/services/toast/toast.service';
import { StatusbarService } from 'src/app/unAuth/services/statusbar/statusbar.service';


@Component({
  selector: 'app-edit-store-address',
  templateUrl: './edit-store-address.component.html',
  styleUrls: ['./edit-store-address.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, NgIf, HeaderComponent, ButtonComponent, InputComponent,]
})
export class EditStoreAddressComponent  implements OnInit {

  //store adress instance
  public storeAdressIntance = new storeAddressModule()

   storeAddressObject!:any;
   address!:string;
   country!:string;
   district!:string;
   isoCountryCode!:string;
   name!:string;
   streetNumber!:string;
   streetName!:string;
   subregion!:string;
   region!:string;
   PostalCode!:string;
   AddressLine2 = ""
   city!:any;
   street = ""
   
   addressObData: any
   //cordinates
   latitude!:any;
   longitude!:any;
   //user id
   userId!:any;
   storeAdress:any;

  constructor(private geolocation: Geolocation, private  _locService: LocationService, private _authServ: AuthServiceService, private _toast:ToastService,private _statusbar : StatusbarService) { 
    this._statusbar.applyBackgroundColor();
  }

  formGroup = new FormGroup({
    street:new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    subRegion:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
    region:new FormControl('', [Validators.required]),
    PostalCode:new FormControl('', [Validators.required]),
    AddressLine2:new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.getLoogedInUser()
    this.fillUserAddressWithUserCurrentPosition()
  }

  private fillUserAddressWithUserCurrentPosition(){
    this.geolocation.getCurrentPosition().then((position:any) => {
        //  console.log(position)
         //asign cordinates
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;

        // this._locService.geocode(position.coords.longitude,position.coords.latitude ).subscribe()
        //  this.fetchAddress(position.coords.longitude,position.coords.latitude)
         this.getAddress(position.coords.latitude,position.coords.longitude)
    });
  }

  getAddress(lati: any, langi:any){
     this._locService.fetchAddress(lati, langi).subscribe({
      next: (res) =>{
        // console.log(res)
        this.storeAddressObject = res.address
        //  console.log('from class module',this.storeAddressObject)
         //asign values
         this.assignValues(lati, langi, res)
         console.log('--------------------------------', res)
      },
      error: (err) => {
        console.log(err)
      }
     })
  }

  getLoogedInUser(){
    this._authServ.loggedInUser().subscribe({
      next: (res) => {
        this.userId = res?.uid
        console.log(this.userId)
        this.getStoreAdressDetails(this.userId)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  //assigning values 
  assignValues(lati:any,long:any, res:any){
         //asign values
         this.address = res.display_name,
         this.country = this.storeAddressObject.country
          this.district =this.storeAddressObject.county
         this.isoCountryCode = this.storeAddressObject.country_code
         this.name = res.name
         this.streetNumber = res.place_rank
         this.subregion = this.storeAddressObject.county
         this.region = this.storeAddressObject.state
         this.PostalCode = this.storeAddressObject.postcode
         this.AddressLine2 = this.AddressLine2
         this.city = this.storeAddressObject.city
         this.streetName  = this.storeAddressObject.road
     this.addressObData = {
      address: this.address,
      country :this.country,
       district :this.district,
      isoCountryCode : this.isoCountryCode,
      name :this.name,
      streetNumber :this.streetNumber,
    
      // subregion :this.subregion,
      // region :this.region,
      // PostalCode :this.PostalCode,
      // AddressLine2 :this.AddressLine2,
      // city :this.city,
      // street:this.street,
      coords :{
        lat:lati,
        long:long
      }
     }
     //setting data to instance
  
  }
 
  
  //populate form using current location
  autoPopulate(){
    this.formGroup.get('street')?.setValue(this.street)
    this.formGroup.get('streetName')?.setValue(this.streetName)
    this.formGroup.get('subRegion')?.setValue(this.subregion)
    this.formGroup.get('city')?.setValue(this.city)
    this.formGroup.get('region')?.setValue(this.region)
    this.formGroup.get('PostalCode')?.setValue(this.PostalCode)
    this.formGroup.get('AddressLine2')?.setValue(this.AddressLine2)
  }
  //add store details
  updatedetails(){
    // console.log(this.formGroup.value)
    const storeAddressData = {
      ...this.addressObData,
      street:this.formGroup.get('street')?.value,
      streetName: this.formGroup.get('streetName')?.value,
      subRegion:this.formGroup.get('subRegion')?.value,
      city:this.formGroup.get('city')?.value,
      region:this.formGroup.get('region')?.value,
      PostalCode:this.formGroup.get('PostalCode')?.value,
      AddressLine2:this.formGroup.get('AddressLine2')?.value,
    }
     this.storeAdressIntance = storeAddressData
    console.log('from instane', this.storeAdressIntance)
    //call store data in database function
    this.addStoreAdressDetails(this.userId, storeAddressData)
    // this._authServ.displaydata()
  }
  //store store details to database
  addStoreAdressDetails(id:any, data:any) {
     this._authServ.addStoreAddressData(id,data).then((res)=>{
      console.log('address data added successfully')
      this._toast.presentToast('Store address details updated successfully', 'success')
     })
     .catch((eror)=>{
          console.log('error adding address data')
          this._toast.presentToast('Could not update details', 'danger')
     })
  }

  //get store adress data from database
  getStoreAdressDetails(id:any){
    this._authServ.getStoreAddress(id).subscribe({
      next: (res) => {
        console.log(res)
        console.log(res)
        this.storeAdress = res
        this.fillForm(this.storeAdress)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  //fill form
  fillForm(data:any) {
    this.formGroup.get('street')?.setValue(data.street)
    this.formGroup.get('subRegion')?.setValue(data.district)
    this.formGroup.get('city')?.setValue(data.city)
    this.formGroup.get('region')?.setValue(data.region)
    this.formGroup.get('PostalCode')?.setValue(data.PostalCode)
    this.formGroup.get('AddressLine2')?.setValue(data.AddressLine2)
    this.formGroup.get('streetName')?.setValue(data.streetName)
  }


}
