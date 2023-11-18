import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, equalTo, get, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private database: Database, private afs: AngularFireAuth) { }


  //add product 
  addProduct(id:any,data:any) {
    // return set(ref(this.database, 'product'), data)
    const productRef = ref(this.database, 'product');
    const newProductRef = push(productRef); // This generates a new unique key
  
    return set(newProductRef, data);
  }

  
  // Function to retrieve products based on store_key (user key)
  getProductsById(key: any): Observable<any[]> {
    const que = query(ref(this.database, 'product'), orderByChild('store_key'), equalTo(key));
    return new Observable<any[]>((observer) => {
      get(que)
        .then((snapshot) => {
          var products: any[] = [];
          snapshot.forEach((childSnapshot) => {
            products.push(childSnapshot.val());
            // console.log('products from fire', childSnapshot.val());
          });
          observer.next(products);
          console.log(snapshot)
        })
        .catch((error) => {
          console.error('Error retrieving products:', error);
          observer.error(error);
        });
    });
  }
   


}
