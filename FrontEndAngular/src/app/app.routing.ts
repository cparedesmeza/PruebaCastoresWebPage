import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule,ExtraOptions} from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { HomeComponent } from "./components/home/home.component";

//Options del router
const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled'
}

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'monitoreo', component: LoginComponent },
    { path: 'busqueda', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'home/:id', component: HomeComponent },
    
];

export const appRoutingProviders: any[] = []; //Levanta el servicio de ruteo en angular
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes,routerOptions);