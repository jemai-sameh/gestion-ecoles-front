import { Seance } from "./seance";
import { Student } from "./student";

export class Absence {
    id!:number;
    dateAbsence!:Date;
    type!:string;
    student!:Student;
    seance!:Seance;
    constructor(){
        this.student= new Student()
     };
}
