import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'
import * as io from "socket.io-client";
import { ApiService } from '../../services/api.service'
import { HttpClient } from '@angular/common/http'
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
  timer = 10
  activeState = 'inactive'
  players: any
  newBid: boolean

  //player data
  firstName: string
  lastName: string

  currBidder: string = ''

  socket = io('http://35.192.54.134:4000');

  index = 1
  name
  speciality
  basePrice

  @ViewChild('playerImage') playerImage

  constructor(public api: ApiService, public http: HttpClient) { }

  ngOnInit() {

    let x = 'akhil.ram@quantiphi.com'

    this.newBid = true

    this.api.updateBuzzerStatus().subscribe((data) => {
      console.log(`Data from UpdateBidAmount Admin Side ${data}`);
      this.currBidder = data
    })



    //get all players at first init
    this.api.getAllPlayersR().subscribe((data) => {
      console.log(data)
      this.players = data

      //update initial player
      this.name = data[this.index - 1]["name"]
      this.speciality = data[this.index - 1]["speciality"]
      this.basePrice = data[this.index - 1]["basePrice"]

      this.playerImage.nativeElement.src = `../assets/img/${data[this.index - 1]["email"]}.jpg`

    })

    //after bid is complete
    this.api.refreshAllPlayerData().subscribe((data) => {
      this.index++;
      console.log(('in update display player'));

      this.name = this.players[this.index - 1]["name"]
      this.speciality = this.players[this.index - 1]["speciality"]
      this.basePrice = this.players[this.index - 1]["basePrice"]

      this.playerImage.nativeElement.src = `../assets/img/${this.players[this.index - 1]["email"]}.jpg`
      // this.playerImage.nativeElement.src = `../assets/img/${this.players[this.index - 1]["email"]}.jpg`


    })


    this.api.updateTimer().subscribe(() => {
      this.timer = 10
      this.startBid()
    })
  }

  checkImage(image) {
    return this.http.get(`../assets/img/${image}.jpg`)
  }
  startBid() {
    console.log('in start timer');
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--
      } else {
        clearInterval(this.interval)
      }
    }, 1000)
  }


}
