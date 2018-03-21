import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.sass']
})

export class SearchScreenComponent implements OnInit {

  players: Object[] = []
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
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getAllPlayers().subscribe((data) => {
      console.log(data);
      this.players = <Object[]>data

    })

    this.keys = Object.keys(this.players[0])
    for (let i = 0; i < this.keys.length; i++) {
      this.nHeads[i] = this.enums[this.keys[i]]
    }
  }

}
