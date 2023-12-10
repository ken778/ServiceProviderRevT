import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataSnapshot, Database, query, update } from '@angular/fire/database';
import { BehaviorSubject, Observable, concat } from "rxjs";
import {
 
  equalTo,
  onValue,
  orderByChild,
  push,
  ref,
  remove,
  set,
} from "@angular/fire/database";
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private database: Database, private afs: AngularFireAuth, private _auth: AuthServiceService) { }

  getOrders(storeId?: string | any): Observable<any> {
    if (storeId) {
      const que = query(
        ref(this.database, "orders"),
        orderByChild("storeKey"),
        equalTo(storeId)
      );
      return new Observable<any[]>((observer) => {
        const callback = (snapshot: DataSnapshot) => {
          const products: any[] = [];
          snapshot.forEach((childSnapshot) => {
            // Include the document ID in the data
            products.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          observer.next(products);
        };
  
        const unsubscribe = onValue(que, callback);
        return () => {
          unsubscribe();
        };
      });
    } else {
      const startCountRef = ref(this.database, "orders");
      return new Observable((observer) => {
        const unsubscribe = onValue(startCountRef, (snapshot) => {
          const data = snapshot.val();
          // Transform data to an array of objects with IDs
          const dataArray = Object.keys(data).map((key) => {
            return { id: key, ...data[key] };
          });
          observer.next(dataArray);
        });
        return () => {
          unsubscribe();
        };
      });
    }
  }

  //get order by id
  getSingleOrder(id?: string | any): Observable<any> {
    if (id) {
      const que = query(
        ref(this.database, "orders"),
        orderByChild("id"),
        equalTo(id)
      );
      return new Observable<any[]>((observer) => {
        const callback = (snapshot: DataSnapshot) => {
          const products: any[] = [];
          snapshot.forEach((childSnapshot) => {
            // Include the document ID in the data
            products.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          observer.next(products);
        };
  
        const unsubscribe = onValue(que, callback);
        return () => {
          unsubscribe();
        };
      });
    } else {
      const startCountRef = ref(this.database, "orders");
      return new Observable((observer) => {
        const unsubscribe = onValue(startCountRef, (snapshot) => {
          const data = snapshot.val();
          // Transform data to an array of objects with IDs
          const dataArray = Object.keys(data).map((key) => {
            return { id: key, ...data[key] };
          });
          observer.next(dataArray);
        });
        return () => {
          unsubscribe();
        };
      });
    }
  }

  //prepare items 
  prepareItems(id: any, data: any) {
    const productRef = ref(this.database, 'orders/' + id);
    return update(productRef, data);
  }
}
