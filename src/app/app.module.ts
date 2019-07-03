import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const firebaseConfig = {
    // your config
    apiKey: "AIzaSyDLhQQ9ZpClQd2r4omsagYGds7Yo3Je31M",
    authDomain: "chintapp-pro-revolution-fx.firebaseapp.com",
    databaseURL: "https://chintapp-pro-revolution-fx.firebaseio.com",
    projectId: "chintapp-pro-revolution-fx",
    storageBucket: "",
    messagingSenderId: "455862906824",
    appId: "1:455862906824:web:b6a1e269e7ce5047"
};


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserAnimationsModule],
    providers: [
        AngularFireModule,
        AngularFirestoreModule,
        StatusBar,
        SplashScreen,
        GooglePlus,
        HttpClientModule,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
