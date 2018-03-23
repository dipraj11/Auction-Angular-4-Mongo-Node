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
  bidSealed: boolean = true
  playerData = {
    name: '',
    batting: true,
    bowling: true,
    allRounder: false,
    basePrice: 50,
    sold: false,
    team: '',
    imagePath: ''
  }
  newBid: boolean

  //player data
  firstName: string
  lastName: string

  currBidder: string = ''

  socket = io('http://localhost:4000');

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.newBid = true

    this.api.updateBuzzerStatus().subscribe((data) => {
      console.log(`Data from UpdateBidAmount Admin Side ${data}`);
      this.currBidder = data
    })



    //get all players at first init
    this.api.getAllPlayersR().subscribe((data)=>{
      console.log(data)
      
    })

    //after bid is complete
    this.api.updatePlayerInfo().subscribe((data) => {
      console.log(data)
      this.playerData = {
        name: data["name"],
        batting: data["batting"],
        bowling: data["bowling"],
        allRounder: data["allRounder"],
        basePrice: data["basePrice"],
        sold: data["sold"],
        team: data["team"],
        imagePath: data["imagePath"]
      }


      this.firstName = this.playerData.name.split(" ")[0]
      this.lastName = this.playerData.name.split(" ")[1]

      console.log(this.firstName);
      console.log(this.lastName);


    })

  }

  startBid() {
    this.newBid = false
    this.interval = setInterval(() => {
      if (this.timeLeft == 0) {
        clearInterval(this.interval)
      } else {
        this.timeLeft--
      }

    }, 1000)
  }


}
