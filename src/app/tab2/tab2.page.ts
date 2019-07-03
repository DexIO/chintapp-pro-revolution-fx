import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Carta} from "../entities/carta";
import {User} from "../entities/user";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    userDoc: AngularFirestoreDocument<User>;

    coleccionCartas: AngularFirestoreCollection<Carta>;
    coleccionUsers: AngularFirestoreCollection<any>;
    cartas: Observable<Carta[]>;
    cartaDoc: AngularFirestoreDocument<Carta>;


    usuario: any;

    pregunta: Carta;
    respuesta: Carta;

    constructor(public toastController: ToastController,
                public db: AngularFirestore,
                public alertController: AlertController,
                private router: Router) {

        if (!localStorage.getItem("alias")) {
            this.router.navigate(['tabs/tab1']);
            this.presentAlert();
        } else {
            this.usuario = JSON.parse(localStorage.getItem("user"));
        }
        this.usuario = JSON.parse(localStorage.getItem("user"));
        this.usuario.alias = JSON.parse(localStorage.getItem("alias"));

        console.log(this.usuario);

        this.cartas = db.collection("Cartas").valueChanges();
        this.coleccionCartas = db.collection('Cartas');
        this.coleccionUsers = db.collection('users');
        this.getCartas().subscribe(cartas =>
            console.log(cartas));

        /*
        this.preguntaDoc = db.doc<Carta>("CartasPreguntas/kOhoIzrIGMMVx0Gd15pH");
        this.preguntaDoc.valueChanges().subscribe(pregunta => console.log(pregunta));
         */
        console.log(this.usuario);

        this.pregunta = new Carta(this.usuario.alias, "", false);
        this.respuesta = new Carta(this.usuario.alias, "", true);


    }

    ngOnInit() {
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCartas() {
        return this.cartas;
    }

    /*
    publicarPregunta() {
      let pregunta = this.coleccionPreguntas.doc(this.db.createId()).set(this.pregunta);
    }

     */


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    async toastRespuesta() {
        const toast = await this.toastController.create({
            mode: "ios",
            message: 'Se ha añadido la carta de respuesta con éxito',
            duration: 2000,
            color: "dark",
        });
        toast.present();
    }

    async toastPregunta() {
        const toast = await this.toastController.create({
            mode: "ios",
            message: 'Se ha añadido la carta de pregunta con éxito',
            duration: 2000,
            color: "dark",
        });
        toast.present();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    public publicarPregunta() {
        let id = this.db.createId();
        this.pregunta.usuario = this.usuario.alias;
        this.pregunta.uid = this.usuario.uid;
        this.pregunta._id = id;
        console.log(this.pregunta);
        let userCard = this.coleccionUsers.doc(this.usuario.userId + "/posts/" + id).set(Object.assign({}, this.pregunta));
        let pregunta = this.coleccionCartas.doc(id).set(Object.assign({}, this.pregunta));

        this.pregunta = new Carta("", "", true);
        this.toastRespuesta();
    }

    public publicarRespuesta() {
        let id = this.db.createId();
        this.respuesta.usuario = this.usuario.alias;
        console.log(this.usuario);
        this.respuesta.uid = this.usuario.userId;
        this.respuesta._id = id;
        console.log(this.respuesta);
        let userCard = this.coleccionUsers.doc(this.usuario.userId + "/posts/" + id).set(Object.assign({}, this.respuesta));
        let respuesta = this.coleccionCartas.doc(id).set(Object.assign({}, this.respuesta));

        this.respuesta = new Carta("", "", true);
        this.toastRespuesta();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'No has iniciado sesión',
            message: 'Debes iniciar sesión para poder continuar.',
            buttons: [{
                text: 'Iniciar sesión',
                handler: () => {
                    this.router.navigate(['tabs/tab3']);
                }
            }
            ],
            backdropDismiss: false
        });

        await alert.present();
    }


}
