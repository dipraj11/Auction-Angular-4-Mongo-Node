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


  buzzerStatus = true



  teamData = {}
  @ViewChild('bidAmount') bidAmountInput
  currBidAmount: number



  socket = io('http://localhost:4000');

  constructor(public api: ApiService, public globals: Globals) { }

  ngOnInit() {

    //to check status of buzzerButton
    this.api.checkStatus().subscribe((data)=>{
      if(data == true) {
        this.buzzerStatus = true
      } else {
        this.buzzerStatus = false
      }
    })

    this.api.getTeamDetails().subscribe((data) => {
      this.teamData = data
    })

    this.api.updateBuzzerStatus().subscribe((data) => {
      this.buzzerStatus = data
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
