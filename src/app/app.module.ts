import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ClarityModule} from '@clr/angular'


import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchScreenComponent } from './components/search-screen/search-screen.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';

//routing
import {Routings} from './app.routing';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component'
import { ApiService } from './services/api.service';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    
    SearchScreenComponent,
    LoginScreenComponent,
    AdminPanelComponent,
    OwnerPanelComponent,
    RegisterScreenComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Routings
    // BootstrapModule
  ],
  providers: [ApiService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
