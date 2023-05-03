import { School } from "./School";
import { Classe } from "./classe";

export class Subject {
    id!:number;
    name!:string;
    coefficient!:number;
    
    classes!:Classe[];
    school!:School;
    constructor(){
        this.school = new School();

     };

}
