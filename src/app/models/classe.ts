import { Subject } from 'src/app/models/subject';
import { Section } from './section';

export class Classe {
    id!:number
    levelClass!:string;
    labelClass!:string;
    firstSchoolYear!:string;
    lastSchoolYear!:string;

    section!:Section;
    subjects!:Subject[];

    constructor(){
        this.section= new Section()
     };
  //TimeTable!:TimeTable;
  //students:!Student[];
}
