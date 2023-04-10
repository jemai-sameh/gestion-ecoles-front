import { AuthService } from 'src/app/services/auth/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  role!:string
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    this.role=this.authservice.getRole()
  }

}
