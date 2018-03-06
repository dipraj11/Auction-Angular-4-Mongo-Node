import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
