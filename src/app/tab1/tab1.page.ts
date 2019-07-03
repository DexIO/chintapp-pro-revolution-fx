import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Carta} from "../entities/carta";
import {Observable} from "rxjs";
import {ActionSheetController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    animations: [
        trigger('heart', [
            state('unliked', style({
                color: '#ededed',
                opacity: '0.5',
                transform: 'scale(1)'
            })),
            state('liked', style({
                color: '#e74c3c',
                opacity: '1',
                transform: 'scale(1.1)'
            })),
            transition('unliked <=> liked', animate('100ms ease-out'))
        ])
    ]

})
export class Tab1Page {


    user: any = JSON.parse(localStorage.getItem('user'));

    public texto: string = "";
    private coleccionCartas: AngularFirestoreCollection<Carta>;
    private cartas: Observable<Carta[]>;

    public arrayCartas: Carta[];

    constructor(public db: AngularFirestore,
                public actionSheetController: ActionSheetController,
                public alertController: AlertController) {
        this.arrayCartas = JSON.parse(sessionStorage.getItem("cartas"));
        console.log(this.arrayCartas)


    }

    ngOnInit() {
        //this.arrayCartas = JSON.parse(sessionStorage.getItem("cartas"));
        //console.log(this.arrayCartas);
        this.arrayCartas = this.getCartasRandom();
        /*
        this.cartas = this.db.collection("Cartas").valueChanges();
        this.getCartas().subscribe(cartas => {
              this.arrayCartas = cartas;
            }
            //sessionStorage.setItem("cartas", JSON.stringify(cartas))
        );

         */

    }


    getCartas() {
        return this.cartas;
    }

    getCartasRandom() {
        let length = 30;
        this.db.createId();
        let item = [];
        for (let i = 0; i < length; i++) {
            this.db.collection("Cartas", ref => ref.where("_id", ">=", this.db.createId()).limit(1)).get().subscribe(snapshot => {
                snapshot.forEach(doc => {
                    if (item.length == 0) {
                        item.push(doc.data());
                    }
                    for (let j = 0; j < item.length && item[j] != undefined; j++) {
                        console.log(j);
                        if (item[j]._id == doc.id) {
                            console.log("hola");
                            break;
                        }
                        if (j == (item.length - 1)) {

                            item.push(doc.data());
                        }
                    }
                });
            });
        }

        return item;

    }

    buscar(event) {
        this.texto = event.detail.value;
    }

    async presentActionSheet(carta: Carta) {
        const actionSheet = await this.actionSheetController.create({
            header: carta.contenido,
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

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });

        await alert.present();
    }

    doRefresh(event) {
        console.log('Begin async operation');
        this.getCartasRandom();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
            this.arrayCartas = this.getCartasRandom();
        }, 1000);
    }

}
