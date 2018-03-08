import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'
import * as io from "socket.io-client";
import { ApiService } from '../../services/api.service'
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent implements OnInit {

  highestBidder: any;
  timeLeft
  baseTime = 16
  bidSealed: boolean = true
  playerData = {
    name: '',
    batting: true,
    bowling: true,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',
    imagePath: ''
  }
  newBid: boolean
  
  //player data
  firstName: string
  lastName: string
  
  currBidAmount: number

  socket = io('http://localhost:4000');
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.newBid = true

    this.api.updateBidAmount().subscribe((data) => {
      console.log(`Data from UpdateBidAmount Admin Side`);
      console.log(data);
      //set current bid & its bidder name
      this.currBidAmount = data.amount
      this.highestBidder = data.teamName
      //reset timer
      this.baseTime = 16
    })

    //after bid is complete
    this.api.updatePlayerInfo().subscribe((data) => {
      console.log(data)
      this.playerData = {
        name: data["name"],
        batting: data["batting"],
        bowling: data["bowling"],
        fielding: data["fielding"],
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
    this.timeLeft = timer(0, 1000).pipe(take(this.baseTime), map(() => --this.baseTime))
  }

  sold() {
    this.socket.emit('sold', { amount: this.currBidAmount, teamName: this.highestBidder })
  }

}
