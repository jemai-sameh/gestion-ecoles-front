import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { LavelValue } from 'src/app/models/labelValue';
//import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { AuthService } from 'src/app/services/auth/auth-service';
//import { LevelService } from 'src/app/services/level/level.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-subject',
  templateUrl: './page-subject.component.html',
  styleUrls: ['./page-subject.component.scss']
})
export class PageSubjectComponent implements OnInit {

  subjectList: Subject[] = [];
  p: number = 1;
  subjectFormGroup!: FormGroup;
  subjectFormGroup2!: FormGroup;

  submitted: boolean = false;
  //levelList : LavelValue[] = [];
  subjectModel: Subject = new Subject();
  subject: Subject = new Subject(); // used for view 
  idSchool!: number;
  role!:string
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  user!: any
  constructor(
    private subjectService: SubjectService,
    //    private levelService:LevelService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);
    this.role=this.authService.getRole();

  }
  ngOnInit(): void {
    this.idSchool = (this.role == 'SUPER_ADMIN') ? null :(this.role == 'ADMIN')?this.user?.id:this.user?.school?.id;


    this.subjectFormGroup = new FormGroup({
      'name': new FormControl('', Validators.required),
      'coefficient': new FormControl('', Validators.required),
      //   'level' : new FormControl('', Validators.required),

    });

    this.subjectFormGroup2 = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', Validators.required),
      'coefficient': new FormControl('', Validators.required),
      //  'level' : new FormControl('', Validators.required),

    });

    this.getSubjectList();
    //  this.getLevels();
  }

  getSubjectList() {
    this.subjectService.getSubjectList(this.idSchool).subscribe(res => {
      this.subjectList = res
    }, error => {
      console.error(error)
    }, () => {

    })
  }
  /*
    getLevels()
    {
      this.levelService.getLevelList().subscribe(
        res => {
          
          this.levelList = res
        } , error => {
          console.error(error)
        } , () => {
  
        }
      )
    }
  */
  public searchBy(key: string): void {

    const res: Subject[] = [];
    this.subjectList.forEach((e) => {

      if (e.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        //    || e.level.label.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.subjectList = res;

    if (res.length === 0 || !key) {
      this.getSubjectList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  /*changeLevel(event:any)
  {
   
    let level:Level  = new Level() ;
    level.id = event;
    this.subjectModel.level=  level;
  }
*/
  addSubject() {
    this.submitted = true;
    if (this.subjectFormGroup.invalid) {
      return;
    }
    this.subjectModel.name = this.subjectFormGroup.value.name;
    this.subjectModel.coefficient = this.subjectFormGroup.value.coefficient;
    this.subjectModel.school.id = this.idSchool

    //      this.subjectModel.level.id = this.subjectFormGroup.value.level

    this.subjectService.saveSubject(this.subjectModel)
      .subscribe({
        next: (res) => {

          this.closeModalBtn.nativeElement.click()
          this.getSubjectList();
          this.submitted = false;
          this.subjectModel = new Subject();
          this.subjectFormGroup.reset();
          this.toastrService.success('Success!', 'Votre matière a été ajoutée!');

        },
      });
  }

  getSubject(subjectId: number) {
    if (subjectId != undefined && subjectId != null) {
      this.subjectService.getSubjectById(subjectId).subscribe(
        res => {
          this.subjectModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.subjectFormGroup2.get("name")?.setValue(this.subjectModel.name);
          this.subjectFormGroup2.get("coefficient")?.setValue(this.subjectModel.coefficient);
          //  this.subjectFormGroup2.get("level")?.setValue(this.subjectModel.level.id);
          this.subjectFormGroup2.updateValueAndValidity()
        });
    }
  }

  updateSubject() {
    this.submitted = true;
    if (this.subjectFormGroup2.invalid) {
      return;
    }
    this.subjectModel.name = this.subjectFormGroup2.value.name;
    this.subjectModel.coefficient = this.subjectFormGroup2.value.coefficient;
    this.subjectModel.school.id = this.idSchool

    this.subjectService.saveSubject(this.subjectModel)
      .subscribe({
        next: (res) => {
          this.toastrService.success('Success!', 'Votre matière a été modifiée!');
          this.submitted = false;
          this.subjectModel = new Subject();
          this.subjectFormGroup2.reset();
          this.closeUpdateModalBtn.nativeElement.click();
          this.getSubjectList();
        },
      });
  }

  deleteSubject(subjectId: number) {
    if (subjectId != undefined && subjectId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette matière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-la!',
        cancelButtonText: 'Non, gardez-la'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.subjectService.deleteSubject(subjectId)
            .subscribe(res => {
              this.getSubjectList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre matière a été supprimée.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre matière est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewSubject(subjectId: number) {
    if (subjectId != undefined && subjectId != null) {
      this.subject = new Subject();
      this.subjectService.getSubjectById(subjectId).subscribe(res => {
        this.subject = res;
        console.log('view ', this.subject)
      })
    }
  }

}
