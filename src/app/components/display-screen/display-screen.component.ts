import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'
import * as io from "socket.io-client";
import { ApiService } from '../../services/api.service'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.sass'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class DisplayScreenComponent implements OnInit {
  interval
  highestBidder: any;
  timeLeft = 15
  activeState = 'inactive'
  players: any
  newBid: boolean

  //player data
  firstName: string
  lastName: string

  currBidder: string = ''

  socket = io('http://localhost:4000');

  index = 1
  name
  speciality
  basePrice

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.newBid = true

    this.api.updateBuzzerStatus().subscribe((data) => {
      console.log(`Data from UpdateBidAmount Admin Side ${data}`);
      this.currBidder = data
    })



    //get all players at first init
    this.api.getAllPlayersR().subscribe((data) => {
      this.players = data

      //update initial player
      this.name = data[this.index - 1]["name"]
      this.speciality = data[this.index - 1]["speciality"]
      this.basePrice = data[this.index - 1]["basePrice"]

    })

    //after bid is complete
    this.api.refreshAllPlayerData().subscribe((data) => {
      this.index++;
      console.log(('in update display player'));

      this.name = this.players[this.index - 1]["name"]
      this.speciality = this.players[this.index - 1]["speciality"]
      this.basePrice = this.players[this.index - 1]["basePrice"]


    })
  }

  // startBid() {
  //   this.newBid = false
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft == 0) {
  //       clearInterval(this.interval)
  //     } else {
  //       this.timeLeft--
  //     }

  //   }, 1000)
  // }


}
