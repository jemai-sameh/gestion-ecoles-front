import { School } from 'src/app/models/School';

export class Admin {
    id!:number;
    firstName!:string;
    lastName!:string;
    email!:string;
    password!:string
    telephone!:string;
    active!:Boolean
   // school!:School;
    constructor(){
      //  this.school = new School();

     };
}
