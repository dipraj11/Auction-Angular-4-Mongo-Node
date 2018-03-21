import { Injectable } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  socket = io('http://localhost:4000');


  constructor(public http: HttpClient) { }

  registerTeam(params) {
    return this.http.post('/register', params)
  }


  getPlayer() {
    return this.http.get('/get-player-info')
  }

  login(params) {
    return this.http.post('/login/login', params)
  }



  //socket functions

  updateBidAmount() {
    return Observable.create((observer) => {
      this.socket.on('broadcast-bid', (data) => {
        observer.next(data)
      })
    })
  }


  updatePlayerInfo(){
    return Observable.create((observer) => {
      this.socket.on('load-new-player', (data) => {
        observer.next(data)
      })
    })
  }


  getAllPlayers() {
    return this.http.get('/get-all-players')
  }
  getTeamDetails() {
    return this.http.get('/team-details')
  }
} 
