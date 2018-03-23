import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.sass']
})
export class LoginScreenComponent implements OnInit {


  loginForm: FormGroup
  username: FormControl
  password: FormControl


  constructor(public formBuilder: FormBuilder, public api: ApiService, public router: Router, public globals: Globals) { }

  ngOnInit() {
    this.username = new FormControl('', Validators.required)
    this.password = new FormControl('', Validators.required)
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })
  }


  login() {
    console.log(this.loginForm.value);

    this.api.login(this.loginForm.value).subscribe((data) => {

      console.log(data)
      this.globals.username = data["teamName"]  
      console.log(this.globals.username);
      
      if (data["type"] == 'team') {
        console.log('owner');
        this.router.navigate(['owner'])
      } else if (data["type"] == 'admin') {
        console.log('admin');
        this.router.navigate(['admin'])
      }


    })
  }

}
