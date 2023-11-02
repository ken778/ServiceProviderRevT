import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {FileOpener} from '@ionic-native/file-opener/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';



import {provideDatabase, getDatabase} from '@angular/fire/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import {Storage, getDownloadURL, ref, uploadBytes} from '@angular/fire/storage'
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideDatabase(()=>getDatabase()),
    AngularFireAuthModule,
    provideStorage(() => getStorage()),
    
   

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FileOpener,AngularFireAuth, Geolocation,],
  bootstrap: [AppComponent],
})
export class AppModule {}
