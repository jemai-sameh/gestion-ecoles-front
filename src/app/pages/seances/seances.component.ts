import { Subject } from './../../models/subject';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Classe } from 'src/app/models/classe';
import { ClassRoom } from 'src/app/models/classroom';
import { Seance } from 'src/app/models/seance';
import { Teacher } from 'src/app/models/teacher';
import { AuthService } from 'src/app/services/auth/auth-service';
import { ClassService } from 'src/app/services/classe/class.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SeanceService } from 'src/app/services/seance/seance.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})
export class SeancesComponent implements OnInit {
  user!: any
  seanceList: Seance[] = [];
  subjectList: Subject[] = [];
  teacherList: Teacher[] = [];
  classList:Classe[]=[];
  classroomList: ClassRoom[] = [];
  role!: string;
  isDisabled: boolean = true;
  p: number = 1;
  seanceFormGroup!: FormGroup;
  seanceFormGroup2!: FormGroup;
  submitted: boolean = false;
  seanceModel: Seance = new Seance();
  seance: Seance = new Seance(); // used for view 

  letters!: string;
  idSchool!: number;

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;

  constructor(
    private seanceService: SeanceService,
    private toastrService: ToastrService,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
    private classService:ClassService,
    private subjectService: SubjectService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);
    console.log(this.user)
    this.role = this.authService.getRole()

  }
  ngOnInit(): void {
    this.idSchool = (this.role == 'SUPER_ADMIN') ? null : (this.role == 'ADMIN') ? this.user?.id : this.user?.school?.id;

    this.seanceFormGroup = new FormGroup({
      'day': new FormControl({ value: '' }, Validators.required),
      'classe': new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),
      'classRoom': new FormControl('', Validators.required),
      'teacher': new FormControl('', Validators.required)
    });

    this.seanceFormGroup2 = new FormGroup({
      'id': new FormControl(''),
      'day': new FormControl({ value: '' }, Validators.required),
      'classe': new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),
      'classRoom': new FormControl('', Validators.required),
      'teacher': new FormControl('', Validators.required)
    });

    this.getSeanceList();
    this.getTeacherList();
    this.getClassRoomList()
    this.getSubjectList();
    this.getClassList();
  }

  getSeanceList() {
    if (this.role === "STUDENT")
      this.seanceService.getSeanceListByClass(this.user.classe.id).subscribe(
        {

          next: data => {
            this.seanceList = data
          }
        });

    else
      this.seanceService.getSeanceList(this.idSchool).subscribe(res => {
        this.seanceList = res
      }, error => {
        console.error(error)
      }, () => {

      })
  }

  getClassList() {
    this.classService.findAll(this.idSchool).subscribe(res => {
      this.classList = res
      

    }, error => {
      console.error(error)
    }, () => {

    })
  }

  getSubjectList() {
    this.subjectService.getSubjectList(this.idSchool).subscribe(res => {
      this.subjectList = res

    }, error => {
      console.error(error)
    }, () => {

    })
  }
  getClassRoomList() {
    this.classroomService.getClassroomList(this.idSchool).subscribe(res => {
      this.classroomList = res
    }, error => {
      console.error(error)
    }, () => {

    })
  }
  getTeacherList() {
    this.teacherService.getTeacherList(this.idSchool).subscribe(
      res => {
        this.teacherList = res
        console.log(this.teacherList)

      }, error => {
        console.error(error)
      }, () => {

      })
  }


  public searchBy(key: string): void {

    const res: Seance[] = [];
    this.seanceList.forEach((e) => {

      if (e.day.toLowerCase().indexOf(key.toLowerCase()) !== -1
        //|| e.subject.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.seanceList = res;

    if (res.length === 0 || !key) {
      this.getSeanceList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  addSeance() {
    // this.submitted = true;
    // if(this.seanceFormGroup.invalid)
    //{
    // return ;
    //}
    this.seanceModel.day = this.seanceFormGroup.get("day")?.value;
    
    let classe: Classe = new Classe();
    classe.id = this.seanceFormGroup.get("classe")?.value;
    this.seanceModel.classe = classe;

    let subject: Subject = new Subject();
    subject.id = this.seanceFormGroup.get("subject")?.value;
    this.seanceModel.subject = subject;
    let classRoom: ClassRoom = new ClassRoom();
    classRoom.id = this.seanceFormGroup.get("classRoom")?.value;
    this.seanceModel.classRoom = classRoom;
    let teacher: Teacher = new Teacher();
    teacher.id = this.seanceFormGroup.get("teacher")?.value;
    this.seanceModel.teacher = teacher;


    this.seanceService.saveSeance(this.seanceModel)
      .subscribe({
        next: (res) => {

          this.closeModalBtn.nativeElement.click()
          this.getSeanceList();
          this.submitted = false;
          this.seanceModel = new Seance();
          this.seanceFormGroup.reset();
          this.toastrService.success('Success!', 'Votre seance a été ajoutée!');

        },
      });

  }

  getSeance(seanceId: number) {
    if (seanceId != undefined && seanceId != null) {
      this.seanceService.findSeanceById(seanceId).subscribe(
        res => {
          this.seanceModel = res
        }, error => {
          console.error(error)
        }, () => {
          console.log(this.seanceModel)
          this.seanceFormGroup2.get("day")?.setValue(this.seanceModel.day);
          this.seanceFormGroup2.get("subject")?.setValue(this.seanceModel.subject.id);
          this.seanceFormGroup2.get("classRoom")?.setValue(this.seanceModel.classRoom.id);
          this.seanceFormGroup2.get("classe")?.setValue(this.seanceModel.classe.id);
          this.seanceFormGroup2.get("teacher")?.setValue(this.seanceModel.teacher.id);

        });
    }
  }

  updateSeance() {
    this.submitted = true;
    if (this.seanceFormGroup2.invalid) {
      return;
    }

    this.seanceModel.day = this.seanceFormGroup2.get("day")?.value;
    this.seanceModel.subject.id = this.seanceFormGroup2.get("subject")?.value;
    console.log(this.seanceFormGroup2.get("classe")?.value)
    let classe!:Classe;
    classe.id=this.seanceFormGroup2.get("classe")?.value;
    this.seanceModel.classe=classe;
    this.seanceModel.classRoom.id = this.seanceFormGroup2.get("classRoom")?.value;
    this.seanceModel.teacher.id = this.seanceFormGroup2.get("teacher")?.value;

    this.seanceService.saveSeance(this.seanceModel)
      .subscribe({
        next: (res) => {
          this.toastrService.success('Success!', 'Votre seance a été modifiée!');
          this.submitted = false;
          this.seanceModel = new Seance();
          this.seanceFormGroup2.reset();
          this.closeUpdateModalBtn.nativeElement.click();
          this.getSeanceList();
        },
      });
  }

  deleteSeance(seanceId: number) {
    if (seanceId != undefined && seanceId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette seance!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-la!',
        cancelButtonText: 'Non, gardez-la'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.seanceService.deleteSeance(seanceId)
            .subscribe(res => {
              this.getSeanceList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre seance a été supprimée.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre seance est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewSeance(seanceId: number) {
    if (seanceId != undefined && seanceId != null) {
      this.seance = new Seance();
      this.seanceService.findSeanceById(seanceId).subscribe(res => {
        this.seance = res;
        console.log('view ', this.seance)
      })
    }
  }



}
