import {Component, OnInit, Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
@Injectable({providedIn: "root"})

export class AuthComponent implements OnInit {

    user: any = {};
    aux: string = "";
    date = new Date();
    horas: number;
    mensaje: string;
    isLoggedIn: boolean;
    alias: any = "";

    constructor(public navCtrl: NavController,
                private googlePlus: GooglePlus,
                private http: HttpClient,
                private afs: AngularFirestore,
                public router: Router) {
        this.horas = this.date.getHours();


        if (this.horas < 14) {
            this.mensaje = 'Buenos días, ';
        } else if (this.horas < 22) {
            this.mensaje = 'Buenas tardes, ';
        } else {
            this.mensaje = 'Buenas noches, ';
        }


        let state = localStorage.getItem("isLoggedIn");

        if (state == "true") {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.alias = JSON.parse(localStorage.getItem("alias"));
        this.user.alias = this.alias;
        console.log(this.user);
    }

    loginGoogle() {
        this.googlePlus.login({})
            .then(res => {
                localStorage.setItem("isLoggedIn", "true");
                this.user = res;
                this.alias = localStorage.setItem("user", JSON.stringify(this.user));
                this.alias = localStorage.getItem("alias");
                this.user.alias = this.alias;
                this.isLoggedIn = true;
                this.getData();
                console.log(res);
                this.router.navigate(['tabs/tab3']);
            })
            .catch(err => console.error(err));
    }

    getData() {
        this.http.get("https://www.googleapis.com/plus/v1/people/me?access_token=" + this.user.accessToken).subscribe((data: any) => {
            this.user.displayName = data.displayName;
            this.user.imageUrl = data.image.url;
        });
    }

    public updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc("users/" + this.user.userId);
        return userRef.set(this.user, {merge: true})

    }

    public asignarAlias() {
        this.user.alias = this.aux;
        this.alias = this.user.alias;
        this.updateUserData(this.user);
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("alias", JSON.stringify(this.alias));
    }

    logout() {
        this.googlePlus.logout();
        this.isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
    }

}
