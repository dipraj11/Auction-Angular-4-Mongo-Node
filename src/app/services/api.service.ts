import { Injectable } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  socket = io('http://localhost:4000');


  constructor(public http: HttpClient) { }

  registerTeam(params) {
    return this.http.post('http://localhost:4000/register', params)
  }


  getPlayer() {
    return this.http.get('http://localhost:4000/get-player-info')
  }

  login(params) {
    return this.http.post('http://localhost:4000/login/login', params)
  }


  checkStatus() {
    return this.http.get('/buzzer-status')
  }
  //socket functions

  updateBuzzerStatus() {
    return Observable.create((observer) => {
      this.socket.on('broadcast-bid', (data) => {
        observer.next(data)
      })
    })
  }

  resetAllBuzzers() {
    return Observable.create((observer) => {
      this.socket.on('reset-all-buzzers', (data) => {
        observer.next(data)
      })
    })
  }

  getTeamPlayers() {
    return this.http.get('/get-team-details')
  }

  refreshAllPlayerData() {
    return Observable.create((observer) => {
      this.socket.on('refresh-all', (data) => {
        observer.next(data)
      })
    })
  }
  updatePlayerInfo() {
    return Observable.create((observer) => {
      this.socket.on('load-new-player', (data) => {
        observer.next(data)
      })
    })
  }

  getAllPlayersR(){
    return this.http.get('http://localhost:4000/get-all-players-r')
  }


  getAllPlayers() {
    return this.http.get('http://localhost:4000/get-all-players')
  }
  getPlayerNames() {
    return this.http.get('http://localhost:4000/get-player-name')
  }

  sellPlayer(params) {
    console.log(params);

    return this.http.post('http://localhost:4000/sold-player', params)
  }
} 
