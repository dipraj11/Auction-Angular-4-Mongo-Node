import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {BootstrapModule} from 'bootstrap';


import { AppComponent } from './app.component';
import { CurrentBidPlayerComponent } from './components/current-bid-player/current-bid-player.component';
import { OwnerTeamDetailsComponent } from './components/owner-team-details/owner-team-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentBidPlayerComponent,
    OwnerTeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    // BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
