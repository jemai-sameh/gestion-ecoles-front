import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!:any
  role!:string;
  constructor(private a:AuthService) { }

  ngOnInit(): void {
     console.log(this.a.getRole())
     var user: any;
    user = localStorage.getItem('user');    
    this.user=JSON.parse(user);
    console.log(this.user)
    this.role=this.a.getRole()

  }

}
