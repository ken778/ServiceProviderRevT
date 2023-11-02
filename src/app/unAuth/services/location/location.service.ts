import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { google } from 'google-maps';
import { HttpClient } from '@angular/common/http';


declare var google: { maps: { Geocoder: new () => any; LatLng: new (arg0: number, arg1: number) => any; }; }

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  geocode(latitude:number, longitude:number):Observable<any>{
         return new Observable<any>(observer=>{
                const geocoder = new google.maps.Geocoder()
                const latLng = new google.maps.LatLng(latitude, longitude)
                geocoder.geocode({ latLng}, (results: any, status: any) =>{
                   console.log(status, results)
                })
         })
  }

  fetchAddress(latitude:any,longitude:any):Observable<any>{
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
 
    return this.http.get(url);
    

  }
}
