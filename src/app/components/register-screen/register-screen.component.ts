import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.sass']
})
export class RegisterScreenComponent implements OnInit {

  registerForm: FormGroup
  teamName: FormControl
  password: FormControl
  ownerName: FormControl
  captainName: FormControl



  constructor(public apiCall: ApiService, public formBuilder: FormBuilder) { }


  ngOnInit() {

    this.password = new FormControl('', Validators.required)
    this.teamName = new FormControl('', Validators.required)
    this.ownerName = new FormControl('', Validators.required)
    this.captainName = new FormControl('', Validators.required)

    this.registerForm = this.formBuilder.group({
      teamName: this.teamName,
      password: this.password,
      ownerName: this.ownerName,
      captainName: this.captainName
    })
  }

  registerTeam() {
    console.log(this.registerForm.value)
    this.apiCall.registerTeam(this.registerForm.value).subscribe((data) => {
      console.log(data);

    })
  }

}
