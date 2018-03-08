import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service'
import * as io from 'socket.io-client'

import { Globals } from '../../globals'

@Component({
  selector: 'app-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['./owner-panel.component.sass']
})
export class OwnerPanelComponent implements OnInit {
  players = [
    {
      name: 'Shishir Tiwari',
      batting: true,
      bowling: true,
      fielding: true,
      price: 500
    },
    {
      name: 'Vishesh Harwani',
      batting: true,
      bowling: true,
      fielding: true,
      price: 500
    },
    {
      name: 'Arnav Gupta',
      batting: true,
      bowling: true,
      fielding: true,
      price: 500
    },
    {
      name: 'Kapil Gadhire',
      batting: true,
      bowling: true,
      fielding: true,
      price: 500
    }
  ]

  playerData = {
    name: '',
    batting: false,
    bowling: false,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',
    imagePath: '',
  }




  teamData = {}
  @ViewChild('bidAmount') bidAmountInput
  currBidAmount



  socket = io('http://localhost:4000');

  constructor(public api: ApiService, public globals: Globals) { }

  ngOnInit() {
    this.globals.username = 'demo'

    this.api.getTeamDetails().subscribe((data) => {
      this.teamData = data
    })

    this.api.updateBidAmount().subscribe((data) => {
      this.currBidAmount = data.amount
    })

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


      

    })
  }

  bid() {

    let bidAmount = this.bidAmountInput.nativeElement.value
    if (bidAmount <= this.currBidAmount) {
      alert('Your Bid Amount should be more than the current bid amount')
    } else {
      console.log(`username is ${this.globals.username}`);
      this.socket.emit('bid', { "amount": this.bidAmountInput.nativeElement.value, "teamName": this.globals.username })
    }


  }

}
