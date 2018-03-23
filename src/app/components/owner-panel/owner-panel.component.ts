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

  players: any[]

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

  maximumBid: number


  buzzerStatus = true



  teamData = {}
  @ViewChild('bidAmount') bidAmountInput
  currBidAmount: number
  currBalance: number = 2000




  socket = io('http://localhost:4000');

  constructor(public api: ApiService, public globals: Globals) { }

  ngOnInit() {

    //to check status of buzzerButton

    this.maximumBid = 2000 - ((2000 - this.currBalance) + (12) * 50)


    this.api.updateBuzzerStatus().subscribe((data) => {
      this.buzzerStatus = false
    })

    this.api.getTeamPlayers().subscribe((playerDetails) => {


      this.players = playerDetails['plyerDetails']
      this.currBalance = playerDetails['balance']


      console.log(playerDetails);

    })
    this.api.refreshAllPlayerData().subscribe((data) => {
      this.api.getTeamPlayers().subscribe((playerDetails) => {
        this.players = playerDetails['plyerDetails']
        this.currBalance = playerDetails['balance']
        this.maximumBid = (this.currBalance + (15 - (this.players.length - 1)) * 50)
      })
    })

    this.api.resetAllBuzzers().subscribe((data) => {
      this.buzzerStatus = true

    })

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




    // })
  }

  bid() {
    this.socket.emit('bid', this.globals.username)
  }

}
