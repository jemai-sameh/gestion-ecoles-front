import { Student } from "./student";

export class Absence {
    id!:number;
    dateAbsence!:Date;
    type!:string;
    student!:Student;

    constructor(){
        this.student= new Student()
     };
}
