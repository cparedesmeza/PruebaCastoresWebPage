import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// IMPORTACIÓN DE MODULOS 

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { RegistroComponent } from './components/registro/registro.component';

// IMPORTACIÓN DE SERVICIOS
import { UserService } from './services/user.services';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { youtubeService } from './services/youtube.services';
import { HeaderComponent } from './components/header/header.component';
import { MonitoreoComponent } from './components/monitoreo/monitoreo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    BusquedaComponent,
    HeaderComponent,
    MonitoreoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    UserService,
    youtubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
