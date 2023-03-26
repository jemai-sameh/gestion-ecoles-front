import { Address } from "./address";
import { Subject } from "./subject";

export class Teacher {
    id!:number;
    firstName!:string;
    lastName!:string;
    address!:Address;
    email!:string;
    telephone!:string;
    image!:string;
    subject!:Subject;

    constructor(){
        this.subject= new Subject();
        this.address = new Address();
     };
}
