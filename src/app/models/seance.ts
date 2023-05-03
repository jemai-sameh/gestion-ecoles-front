import { Classe } from './classe';
import { ClassRoom } from './classroom';
import { Teacher } from './teacher';
import { Subject } from './subject';
import { Absence } from './absence';


export class Seance {
    id!:number;
    day!: String;
    numSeance!: number;
    subject!: Subject;
    classRoom!: ClassRoom;
    teacher!: Teacher;
    absences!: Absence[];
    classe!:Classe;
   
}
