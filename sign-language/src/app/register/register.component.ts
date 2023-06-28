import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(private http: HttpClient, public router: Router,
              // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // create form group for new review
    let username = new FormControl(null, Validators.required);
    let password = new FormControl(null, Validators.required);
    let firstName = new FormControl(null, Validators.required);
    let lastName = new FormControl(null, Validators.required);
    let email = new FormControl(null, [Validators.required, Validators.email]);
    let phone = new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]);
    let address = new FormControl(null, Validators.required);
    this.registerForm = new FormGroup({
      username: username,
      password: password,
      email: email,
    });
  }

  register() {
    this.http.post(
      '/api/create/user',
      JSON.stringify(this.registerForm.value),
      {headers: new HttpHeaders( {'Content-Type': 'application/json'})}
    ).subscribe((data: any) => {
      if(data["acknowledged"]){
        alert("Successfully registered");
      }
      else{
        alert("Registration failed");
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
}
