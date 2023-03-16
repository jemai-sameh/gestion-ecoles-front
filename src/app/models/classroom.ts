import { School } from "./School";

export class ClassRoom {
    id!:number;
    classRoomNumber!:string;
    bloc!:string;
    school!:School;

    constructor(){
        this.school= new School()
     };

}