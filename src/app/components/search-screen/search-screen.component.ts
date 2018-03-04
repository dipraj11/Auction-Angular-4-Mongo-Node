import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.sass']
})
export class SearchScreenComponent implements OnInit {
  users = [{
    id:'1',
    name: 'Shishir Tiwari',
    creation:'2017-09-01',
    color: 'red'
    
  }]
  constructor() { }

  ngOnInit() {
  }

}
