import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Carta} from "../entities/carta";
import {ActionSheetController, AlertController} from "@ionic/angular";

@Component({
    selector: 'app-colecciones',
    templateUrl: './colecciones.component.html',
    styleUrls: ['./colecciones.component.scss'],
})
export class ColeccionesComponent implements OnInit {

    private cartas: any;
    public arrayCartas: any;
    user: any = JSON.parse(localStorage.getItem("user"));
    texto: string = "";

    constructor(public db: AngularFirestore,
                private alertController: AlertController,
                private actionSheetController: ActionSheetController) {
        console.log(this.user);
        this.getCartasGuardadas();
    }

    ngOnInit() {

    }

    getCartasGuardadas() {
        this.cartas = this.db.collection("users/" + this.user.userId + "/coleccionPrincipal").valueChanges().subscribe(cartas => {
            this.arrayCartas = cartas;
        });

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
            header: 'Estás a punto de eliminar una carta de tu colección',
            subHeader: '¿Deseas continuar?',
            message: carta.contenido,
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Confirmar',
                    cssClass: 'borrar',
                    handler: () => {
                        this.cartas = this.db.collection("users/" + this.user.userId + "/coleccionPrincipal").doc(carta._id).delete();
                    }
                }

            ],
        });

        await alert.present();
    }


}
