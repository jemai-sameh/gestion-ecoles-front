import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/securite/authenticationRequest';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword!: boolean;

  authenticationRequest :AuthenticationRequest=new AuthenticationRequest();
  errorMsg : string=""
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("accesstoken")
    localStorage.removeItem("idSchool")
    localStorage.removeItem("mailUser")
  }
  login(){
    this.authService.login(this.authenticationRequest).subscribe(
      ress =>{
        this.authService.setUserToken(ress)
        this.router.navigate(["/acc/home"])

      },error =>{
        this.errorMsg= "login ou mot de pass incorect"
      }
    )

  }

}
