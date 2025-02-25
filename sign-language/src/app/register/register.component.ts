import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // form
  registerForm!: FormGroup;
  //if all fields are filled correctly, changes submit button from disabled to enabled and vice versa
  fieldsCorrect: boolean = false;
  isSubmitted:boolean = false;
  isLoggedIn:boolean = false;

  constructor(private http: HttpClient, public router: Router
              // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // create form group for new review
    this.isLoggedIn = Boolean(localStorage.getItem('currentUser'));
    let username = new FormControl(null, Validators.required);
    let password = new FormControl(null, Validators.required);
    let email = new FormControl(null, [Validators.required, Validators.email]);
    this.registerForm = new FormGroup({
      username: username,
      password: password,
      email: email,
    });
  }

  register() {
    this.registerForm.value.password = bcrypt.hashSync(this.registerForm.value.password, 10);
    this.http.post(
      '/api/create/user',
      JSON.stringify(this.registerForm.value),
      {headers: new HttpHeaders( {'Content-Type': 'application/json'})}
    ).subscribe((data: any) => {
      if(data["acknowledged"]){
        // alert("Successfully registered");
        localStorage.setItem('currentUser', this.registerForm.value["username"]);
        this.isLoggedIn = true;
      }
      else{
        alert(data["error"]);
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
      }
    });
  }

  inputValid() {
    return this.registerForm.valid;
  }

  validateUsername() {
    return this.registerForm.controls['username'].valid || this.registerForm.controls['username'].untouched;
  }

  validatePassword() {
    return this.registerForm.controls['password'].valid || this.registerForm.controls['password'].untouched;
  }

  validateEmail() {
    return this.registerForm.controls['email'].valid || this.registerForm.controls['email'].untouched;
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

  getUsername(){
    return localStorage.getItem('currentUser');
  }
}
