import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {AuthComponent} from "../auth/auth.component";
import {CartasUsuarioComponent} from "../cartas-usuario/cartas-usuario.component";
import {PipesModule} from "../pipes/pipes.module";
import {ColeccionesComponent} from "../colecciones/colecciones.component";
import {PeopleComponent} from "../people/people.component";
import {SettingsComponent} from "../settings/settings.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        PipesModule
    ],
    declarations: [Tab3Page, AuthComponent, CartasUsuarioComponent, ColeccionesComponent, PeopleComponent, SettingsComponent]
})
export class Tab3PageModule {
}
