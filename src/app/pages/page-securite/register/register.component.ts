import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Classe } from 'src/app/models/classe';
import { RegisterRequest } from 'src/app/models/securite/registerRequest';
import { AuthService } from 'src/app/services/auth/auth-service';
import { ClassService } from 'src/app/services/classe/class.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  adr: Address = new Address();
  classList : Classe[] = [];
  registerRequest: RegisterRequest = new RegisterRequest();
  errorMsg ! : string;
  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/img/avatar.png'
  constructor(private authService : AuthService, private router: Router, private classService:ClassService) { }

  ngOnInit(): void {
    this.registerRequest.classe.id =-1;
    this.getClasses();

  }
  getClasses()
  {
    this.classService.findAll().subscribe(
      res => {
        
        this.classList = res
      } , error => {
        console.error(error)
      } , () => {

      }
    )
  }
  register(){
    this.registerRequest.address=this.adr;
    this.authService.register(this.registerRequest)
    .subscribe(result=>{
      this.router.navigate(['/login'])
    console.log(result)
    
    },
    (err:HttpErrorResponse)=>this.errorMsg='this email is existe')
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0) as File;
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  changeSource(event:any) {      
    event.target.src = "assets/img/avatar.png";
}

}
