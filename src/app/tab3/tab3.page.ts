import {Component} from '@angular/core';
import {ActionSheetController} from "@ionic/angular";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    option: any = {
        items: [],
        selected: "",
        id: ""
    };

    constructor(public actionSheetController: ActionSheetController) {
        this.option.items = [
            "Mis cartas",
            "Colecciones",
            "Gente a la que sigo",
            "Ajustes"
        ];

        this.option.selected = this.option.items[0];
        this.option.id = 0;
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Selecciona una opción',
            buttons: [{
                text: 'Mis cartas',
                handler: () => {
                    this.option.id = 0;
                    this.option.selected = this.option.items[0];
                }
            }, {
                text: 'Cartas guardadas',
                handler: () => {
                    this.option.id = 1;
                    this.option.selected = this.option.items[1];
                }
            }, {
                text: 'Gente a la que sigo',
                handler: () => {
                    this.option.id = 2;
                    this.option.selected = this.option.items[2];
                }
            }, {
                text: 'Ajustes',
                handler: () => {
                    this.option.id = 3;
                    this.option.selected = this.option.items[0];
                }
            }, {
                text: 'Cancelar',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }


}
