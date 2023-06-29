import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // form
  loginForm!: FormGroup;
  //if all fields are filled correctly, changes submit button from disabled to enabled and vice versa
  fieldsCorrect: boolean = false;
  isSubmitted:boolean = false;

  constructor(private http: HttpClient, public router: Router
              // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // create form group for new review
    let username = new FormControl(null, Validators.required);
    let password = new FormControl(null, Validators.required);
    this.loginForm = new FormGroup({
      username: username,
      password: password,
    });
  }

  login(){
    this.http.post(
      '/api/login',
      JSON.stringify(this.loginForm.value),
      {headers: new HttpHeaders( {'Content-Type': 'application/json'})}
    ).subscribe((data: any) => {
        alert(data["msg"]);
        if(data["acknowledged"]){
          localStorage.setItem('currentUser', this.loginForm.value["username"]);
        }
        else{
          localStorage.removeItem('currentUser');
        }
    });
  }

  inputValid() {
    return this.loginForm.valid;
  }

  validateUsername() {
    return this.loginForm.controls['username'].valid || this.loginForm.controls['username'].untouched;
  }

  validatePassword() {
    return this.loginForm.controls['password'].valid || this.loginForm.controls['password'].untouched;;
  }
}
