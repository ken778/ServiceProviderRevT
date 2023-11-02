import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, push, ref, set } from '@angular/fire/database';

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

}
