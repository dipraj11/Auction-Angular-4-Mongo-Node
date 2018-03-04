import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.sass']
})

export class SearchScreenComponent implements OnInit {

  players = [{
    name: 'Shishir Tiwari',
    batting: true,
    bowling: true,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',


  },
  {
    name: 'Rajesh Singh',
    batting: true,
    bowling: true,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',



  },
  {
    name: 'Vishesh Harwani',
    batting: true,
    bowling: true,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',



  }
  ]
  nHeads: any = []
  enums: any = {
    name: 'Name',
    team: 'Team',
    sold: 'Status',
    basePrice: 'Base Price',
    batting: 'Batting',
    bowling: 'Bowling',
    fielding: 'Fielding',
  }
  keys
  soldStatus = {
    true: 'Sold',
    false: 'Unsold'
  }
  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.players[0])
    for (let i = 0; i < this.keys.length; i++) {
      this.nHeads[i] = this.enums[this.keys[i]]
    }
  }

}
