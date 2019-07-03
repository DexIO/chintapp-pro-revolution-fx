import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GooglePlus} from "@ionic-native/google-plus/ngx";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private googlePlus: GooglePlus,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            console.log('Device is ready!');
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#ffffff');
            this.googlePlus.trySilentLogin({})
                .then((data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    console.log(data);
                    this.splashScreen.hide();
                }, (error) => {
                    console.log(error);
                    this.splashScreen.hide();
                });

        });
    }
}
