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


  constructor(public apiCall: ApiService, public formBuilder: FormBuilder) { }


  ngOnInit() {

    this.password = new FormControl('', Validators.required)
    this.teamName = new FormControl('', Validators.required)

    this.registerForm = this.formBuilder.group({
      teamName: this.teamName,
      password: this.password
    })
  }

  registerTeam() {
    console.log(this.registerForm.value)
  }

}
