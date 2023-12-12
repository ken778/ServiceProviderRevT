import { Injectable } from '@angular/core';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { registerModule, storeAddressModule } from 'src/app/shared/models/interfaces/user/user.iterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  auth = getAuth();
  //register class module
  public registerEmailInstance = new registerModule();

  //store address class module
  public storeAdressIntance = new storeAddressModule()

  //variables
  isActive = false
  isVerified = false
  spinner = false;


  constructor(private database: Database, private afs: AngularFireAuth, private router: Router) {}

  //set register inputs
  setRegInputs(
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    city: string,
    password: string
  ) {
  }

  //register
  register(email: string, password: string, ) {
    this.afs
      .createUserWithEmailAndPassword(email, password)
      .then((res:any) => {
        console.log('registred', res);
        const user = res.user;
        const uid = user?.uid;
        console.log('user details', user);
        this.addNewUser(uid, user)
      })
      .catch((error:any) => {
        console.log(error);
      });
  }

  //store new user data to database
  addNewUser(uid: any, user:any) {
    let data = {...this.registerEmailInstance,
       account_type: 'SERVICE_PROVIDER',
       created_at:new Date(),
       isEmailVerified :user.emailVerified,
       isActive: this.isActive,
       isVarified: this.isVerified
    }
    set(ref(this.database, 'persons/' + uid), data);
    console.log('data inserted')
  }


  //sign in 
  login(user:{email:string, password:string}){
       return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }

  //logged in user
  loggedInUser(){
    return this.afs.authState;
  }
  
  //get sinfle user details
  getUser(uid:any): Observable<any> {
    const startCountRef = ref(this.database, 'persons/' + uid);
    return new Observable((observer:any) => {
      const unsubscribe = onValue(startCountRef, (snapshot:any) => {
        const data = snapshot.val();
        observer.next(data);
      });
      return () => {
        unsubscribe();
      };
    });
  }


  //get store opertaing hours 
  getStoreHours(uid:any): Observable<any> {
    const startCountRef = ref(this.database, 'storeOperationHours/' + uid);
    return new Observable((observer) => {
      const unsubscribe = onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        observer.next(data);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  
  //get store adress
  getStoreAddress(uid:any): Observable<any> {
    const startCountRef = ref(this.database, 'storeAddress/' + uid);
    return new Observable((observer) => {
      const unsubscribe = onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        observer.next(data);
      });
      return () => {
        unsubscribe();
      };
    });
  }
  

  //get users
  getUsers(): Observable<any> {
    const startCountRef = ref(this.database, 'persons');
    return new Observable((observer) => {
      const unsubscribe = onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
          // Transform data to an array of objects without IDs
          const dataArray = Object.keys(data).map((key) => {
            const { id, ...userData } = data[key];
            return userData;
          });
          
        observer.next(dataArray);
  
      });
      return () => {
        unsubscribe();
      };
    });
  }
  // getUsers(): Observable<any[]> {
  //   const startCountRef = ref(this.database, 'persons');
  //   return new Observable((observer) => {
  //     const unsubscribe = onValue(startCountRef, (snapshot) => {
  //       const data = snapshot.val();

  //       // Transform data to an array of objects without IDs
  //       const dataArray = Object.keys(data).map((key) => {
  //         const { id, ...userData } = data[key];
  //         return userData;
  //       });

  //       observer.next(dataArray);
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   });
  // }

  //add store address
  addStoreAddressData(id:any,data:any) {
   let addressObj = {
     ...data,
     uid:id
   }
    return set(ref(this.database, 'storeAddress/' + id ), addressObj)
  }
  displaydata(){
    console.log('from auth service',this.storeAdressIntance)
  }

  //add store data
  addStoreDetails(id:any, data:any){
  
         return set(ref(this.database, 'stores/' + id), data)
  }
  //add operrations hours 
  addOperationsHours(id:any, data:any){
      return set(ref(this.database, 'storeOperationHours/' + id), data)
  }

    //get store details
    getStoreDetails(uid:any): Observable<any> {
      const startCountRef = ref(this.database, 'stores/' + uid);
      return new Observable((observer) => {
        const unsubscribe = onValue(startCountRef, (snapshot) => {
          const data = snapshot.val();
          observer.next(data);
        });
        return () => {
          unsubscribe();
        };
      });
    }

    //upda te user 
    updateUser(uid:any, data:any){
      return update(ref(this.database, 'persons/' + uid), data)
    }
    //upda te user 
    updateStore(uid:any, data:any){
      return update(ref(this.database, 'stores/' + uid), data)
    }

  //logout 
logoutUser(){
  return this.auth.signOut()
}

//get all users
getAllUsers(){
   
}

getSpinner(){
  return this.spinner;
  
}


}
