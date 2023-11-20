import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataSnapshot, Database, equalTo, get, onValue, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private database: Database, private afs: AngularFireAuth) { }


  //add product 
  addProduct(data: any) {
    const productRef = ref(this.database, 'product');
  
    // Generates a new unique key (ID)
    const newProductId = push(productRef).key;
  
    // Add the generated ID to the product data
    const productWithId = { ...data, id: newProductId };
  
    // Create a reference to the specific product using the generated ID
    const newProductRef = ref(this.database, 'product/' + newProductId);
  
    // Save the product data with the generated ID to the database
    return set(newProductRef, productWithId);
  }

  
  // Function to retrieve products based on store_key (user key)
  getProductsById(key: any): Observable<any[]> {
    const que = query(ref(this.database, 'product'), orderByChild('store_key'), equalTo(key));
    return new Observable<any[]>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const products: any[] = [];
        snapshot.forEach((childSnapshot) => {
          products.push(childSnapshot.val());
        });
        observer.next(products);
      };
  
      const dbRef = ref(this.database, 'product');
      const unsubscribe = onValue(que, callback);
  
      // Cleanup function to unsubscribe when the observable is unsubscribed
      return () => {
        unsubscribe();
      };
    })
  }

  // get singel product
  getSingleProduct(id: any): Observable<any[]> {
    const que = query(ref(this.database, 'product'), orderByChild('id'), equalTo(id));
    return new Observable<any[]>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const products: any[] = [];
        snapshot.forEach((childSnapshot) => {
          products.push(childSnapshot.val());
        });
        observer.next(products);
      };
  
      const dbRef = ref(this.database, 'product');
      const unsubscribe = onValue(que, callback);
  
      // Cleanup function to unsubscribe when the observable is unsubscribed
      return () => {
        unsubscribe();
      };
    })
  }
   


}
