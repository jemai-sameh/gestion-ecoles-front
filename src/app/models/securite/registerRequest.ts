import { School } from './../School';
import { Address } from "../address";
import { Classe } from "../classe";

export class RegisterRequest {
    firstName !: string;
    lastName !: string;
    email !: string;
    password !:string;  
    address !:Address;   
    telephone !:number;  
    image !: string; 
    dateOfBirth !: Date;
    classe!:Classe;
    school!:School;

    constructor(){
        this.classe= new Classe();
        this.address = new Address();
        this.school = new School();

     };
       

}