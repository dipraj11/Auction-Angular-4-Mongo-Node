import { Injectable } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http'

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }

  registerTeam(params){
    return this.http.post('/register', params)
  }
}
