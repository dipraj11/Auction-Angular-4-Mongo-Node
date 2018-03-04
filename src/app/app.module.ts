import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {BootstrapModule} from 'bootstrap';
import {ClarityModule} from '@clr/angular'


import { AppComponent } from './app.component';
import { CurrentBidPlayerComponent } from './components/current-bid-player/current-bid-player.component';
import { SearchScreenComponent } from './components/search-screen/search-screen.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';

//routing
import {Routings} from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    CurrentBidPlayerComponent,
    SearchScreenComponent,
    LoginScreenComponent,
    AdminPanelComponent,
    OwnerPanelComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule, 
    Routings
    // BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
