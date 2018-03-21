import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators'
import * as io from "socket.io-client";
import { ApiService } from '../../services/api.service'

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent implements OnInit {


  adminForm: FormGroup


  playerName: FormControl
  bidAmount: FormControl
  teamName: FormControl

  playerNames

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


  currBidAmount: number

  // socket = io('http://localhost:4000');

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getPlayerNames().subscribe((data) => {

      console.log(data);
      this.playerNames = data

    })

    this.playerName = new FormControl('', Validators.required)
    this.bidAmount = new FormControl('', Validators.required)
    this.teamName = new FormControl('', Validators.required)
    this.adminForm = new FormGroup({
      playerName: this.playerName,
      bidAmount: this.bidAmount,
      teamName: this.teamName,
    })



    // this.newBid = true

    // this.api.updateBidAmount().subscribe((data) => {
    //   console.log(`Data from UpdateBidAmount Admin Side`);
    //   console.log(data);
    //   //set current bid & its bidder name
    //   this.currBidAmount = data.amount
    //   this.highestBidder = data.teamName
    //   //reset timer
    //   this.timeLeft = 15

    // })

    //after bid is complete
    // this.api.updatePlayerInfo().subscribe((data) => {
    //   console.log(data)
    //   this.playerData = {
    //     name: data["name"],
    //     batting: data["batting"],
    //     bowling: data["bowling"],
    //     fielding: data["fielding"],
    //     basePrice: data["basePrice"],
    //     sold: data["sold"],
    //     team: data["team"],
    //     imagePath: data["imagePath"]
    //   }


    //   this.firstName = this.playerData.name.split(" ")[0]
    //   this.lastName = this.playerData.name.split(" ")[1]

    //   console.log(this.firstName);
    //   console.log(this.lastName);


    // })

  }

  startBid() {
    // this.newBid = false
    // this.interval = setInterval(() => {
    //   if (this.timeLeft == 0) {
    //     clearInterval(this.interval)
    //   } else {
    //     this.timeLeft--
    //   }

    // }, 1000)
  }

  sell() {
    let params = {
      playerName: this.adminForm.value.playerName,
      bidAmount: this.adminForm.value.bidAmount,
      teamName: this.adminForm.value.teamName
    }
    this.api.sellPlayer(params).subscribe((data)=>{
      console.log(data)
    })
    // this.socket.emit('sold', { amount: this.currBidAmount, teamName: this.highestBidder })
  }
}
