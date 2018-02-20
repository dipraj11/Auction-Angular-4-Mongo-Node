import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs/observable/timer'
import {take,map} from 'rxjs/operators'

@Component({
  selector: 'current-bid-player',
  templateUrl: './current-bid-player.component.html',
  styleUrls: ['./current-bid-player.component.sass']
})
export class CurrentBidPlayerComponent implements OnInit {
  timeLeft
  baseTime = 16
  bidSealed: boolean = true

  newBid: boolean
  constructor() { }

  ngOnInit() {
    this.newBid = true
  }

  startBid(){
    this.newBid = false
    this.timeLeft = timer(0,1000).pipe(take(this.baseTime), map(()=> --this.baseTime))
  }

}
