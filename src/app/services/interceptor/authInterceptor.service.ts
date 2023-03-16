import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from 'src/app/models/securite/authenticationResponse';
//import { AuthenticationResponse } from 'src/app/models/authenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authenticationResponse : AuthenticationResponse ={};
  if(localStorage.getItem("accesstoken")){
    authenticationResponse= JSON.parse(localStorage.getItem("accesstoken") as string )
 req=req.clone({
  headers:new  HttpHeaders({
    Authorization:"Bearer "+authenticationResponse.token
  })
})
  }
return next.handle(req)
  }
  

}
