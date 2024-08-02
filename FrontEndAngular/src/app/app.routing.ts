import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule,ExtraOptions} from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { HomeComponent } from "./components/home/home.component";
import { MonitoreoComponent } from "./components/monitoreo/monitoreo.component";
import { BusquedaComponent } from "./components/busqueda/busqueda.component";
import { FavoritasComponent } from "./components/favoritas/favoritas.component";
import { RecupasswordComponent } from "./components/recupassword/recupassword.component";

//Options del router
const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled'
}

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'monitoreo/:id', component: MonitoreoComponent },
    { path: 'favoritas/:id', component: FavoritasComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'home/:id', component: HomeComponent },
    { path: 'recuperacion', component: RecupasswordComponent },
    
];

export const appRoutingProviders: any[] = []; //Levanta el servicio de ruteo en angular
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes,routerOptions);