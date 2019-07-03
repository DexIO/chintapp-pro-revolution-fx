import {Component, OnInit} from '@angular/core';
import {Carta} from "../entities/carta";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {text} from "@angular/core/src/render3";

@Component({
    selector: 'app-cartas-usuario',
    templateUrl: './cartas-usuario.component.html',
    styleUrls: ['./cartas-usuario.component.scss'],
})
export class CartasUsuarioComponent implements OnInit {

    private coleccionCartas: AngularFirestoreCollection<Carta>;
    private cartas: Observable<Carta[]>;
    private user: any;

    public texto: string = "";
    public arrayCartas: Carta[];


    constructor(public db: AngularFirestore,
                public actionSheetController: ActionSheetController,
                public alertController: AlertController) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.cartas = this.db.collection("users/" + this.user.userId + "/posts").valueChanges();
        this.getCartas().subscribe(cartas => {
            this.arrayCartas = cartas;

        })
    }

    getCartas() {
        return this.cartas;
    }

    async presentActionSheet(carta: Carta) {
        const actionSheet = await this.actionSheetController.create({
            header: carta.contenido,
            subHeader: carta.usuario,
            buttons: [{
                text: 'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    console.log('Delete clicked');
                }
            }, {
                text: 'Share',
                icon: 'share',
                handler: () => {
                    console.log('Share clicked');
                }
            }, {
                text: 'Play (open modal)',
                icon: 'arrow-dropright-circle',
                handler: () => {
                    console.log('Play clicked');
                }
            }, {
                text: 'Favorite',
                icon: 'heart',
                handler: () => {
                    console.log('Favorite clicked');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async presentAlert(carta) {
        const alert = await this.alertController.create({
            header: '¡Estás a punto de borrar una carta!',
            subHeader: '¿Deseas continuar?',
            message: carta.contenido,
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Borrar',
                    cssClass: 'borrar',
                    handler: () => {
                        this.borrarCarta(carta);
                    }
                },

            ],
        });

        await alert.present();
    }


    borrarCarta(carta) {
        var deleteDoc = this.db.collection('users/' + this.user.userId + "/posts").doc(carta._id).delete();
        var deleteDoc = this.db.collection('Cartas/').doc(carta._id).delete();
    }

}
