import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name!:string
  image!:string
  constructor() { 
    }

  ngOnInit(): void {
    var user: any;
    user = localStorage.getItem('user');    
    this.name=JSON.parse(user).firstName+" "+JSON.parse(user).lastName
    this.image=JSON.parse(user).image
  
  }

  relogin(){
    
    localStorage.removeItem("accesstoken")
    window.location.reload ();
  }

}
