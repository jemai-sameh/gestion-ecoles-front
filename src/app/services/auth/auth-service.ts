import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/models/securite/authenticationRequest';
import { AuthenticationResponse } from 'src/app/models/securite/authenticationResponse';
import { RegisterRequest } from 'src/app/models/securite/registerRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router, private httpClient: HttpClient) { }
  private baseUrl = environment.baseurl + "/auth"
  isUserAuthenticated(): boolean {
    if (localStorage.getItem("accesstoken")) {
      return true;
    }
    this.router.navigate(["/login"])
    return false;
  }
  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const url = this.baseUrl + "/authenticate"
    return this.httpClient.post(url, authenticationRequest)
  }
  setUserToken(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem("accesstoken", JSON.stringify(authenticationResponse))
    this.addUserStorage();
    console.log(JSON.stringify(authenticationResponse))
    // localStorage.setItem("mailUser",JSON.stringify(authenticationResponse.name))
  }
  register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    const url = this.baseUrl + "/register"
    return this.httpClient.post(url, registerRequest)
  }
  getRole = () => {
    var user: any;
    user = localStorage.getItem('accesstoken');
    let token = JSON.parse(user).token;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.authorities[0].authority;
  }
    findUser(email: string): Observable<any> {
      
      return this.httpClient.get(`${this.baseUrl}/findByEmail/${email}`);
  }

  addUserStorage = () => {
    var user: any;
    user = localStorage.getItem("accesstoken");
    let token = JSON.parse(user).token;
    console.log(JSON.parse(user))

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log(decodedToken)
    const mail = decodedToken.sub;
    console.log(mail)
    this.findUser(mail).subscribe({
      next:data=> {
        console.log(data)
    localStorage.setItem("user", JSON.stringify(data))
      }
    });
    


  }
}
