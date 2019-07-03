import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {joinJsonPointer} from "@angular-devkit/core/src/json/schema";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
    selector: 'app-animated-like',
    templateUrl: './animated-like.component.html',
    styleUrls: ['./animated-like.component.scss'],
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
export class AnimatedLikeComponent implements OnInit {

    @Input('carta') carta: any;

    buttonColor: string;
    user: any = JSON.parse(localStorage.getItem("user"));


    constructor(public db: AngularFirestore) {
    }

    ngOnInit() {

        this.db.collection("users/" + this.user.userId + "/coleccionPrincipal", ref => ref.where("_id", "==", this.carta._id).limit(1)).get().subscribe(value => {
            value.forEach(doc => {
                if (doc.exists) {
                    this.buttonColor = "#e46";
                }
            })
        })
    }

    like() {
        var cityRef = this.db.collection('users/' + this.user.userId + "/coleccionPrincipal").doc(this.carta._id);
        var getDoc = cityRef.get().subscribe(doc => {
            if (!doc.exists) {
                console.log('Se ha dado un like!');
                this.buttonColor = '#EE4466';
                this.db.collection('users/' + this.user.userId + "/coleccionPrincipal").doc(this.carta._id).set(this.carta);
            } else {
                console.log('Document data:', doc.data());
                if (this.carta.isRespuesta) {
                    this.buttonColor = '#666';
                } else {
                    this.buttonColor = '#fff';

                }
                this.db.collection('users/' + this.user.userId + "/coleccionPrincipal").doc(this.carta._id).delete();
            }
        })
    }


}
