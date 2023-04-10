import { AuthService } from 'src/app/services/auth/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  constructor(private a:AuthService) { }

  ngOnInit(): void {
  }

}
