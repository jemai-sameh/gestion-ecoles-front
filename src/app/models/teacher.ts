import { School } from "./School";
import { Address } from "./address";
import { Subject } from "./subject";

export class Teacher {
    id!:number;
    firstName!:string;
    lastName!:string;
    address!:Address;
    email!:string;
    password!:string;
    telephone!:string;

    image!:string;
    subject!:Subject;
    school!:School;
    constructor(){
        this.subject= new Subject();
        this.address = new Address();
        this.school = new School();

     };
}
