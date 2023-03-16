import { School } from './School';
import { Address } from "./address";
import { Classe } from "./classe";

export class Student {
    id!:number;
    firstName!:string;
    lastName!:string;
    dateOfBirth!:Date;
    email!:string;
    telephone!:string;
    image!:string;
    address!:Address;
    classe!:Classe;
    school!:School;

    constructor(){
        this.classe= new Classe();
        this.address = new Address();
        this.school = new School();

     };
}
