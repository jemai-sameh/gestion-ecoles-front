import { School } from "./School";

export class Section {
    id!:number;
    code!:string;
    label!:string;
    school!:School;
    constructor(){
        this.school = new School();

     };
}
