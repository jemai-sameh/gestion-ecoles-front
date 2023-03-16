import { LabelValue } from './../../../models/labelValue';
import { SectionService } from 'src/app/services/section/section.service';
import { Section } from './../../../models/section';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Classe } from 'src/app/models/classe';
import { ClassService } from 'src/app/services/classe/class.service';
import Swal from 'sweetalert2';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-page-class',
  templateUrl: './page-class.component.html',
  styleUrls: ['./page-class.component.scss']
})
export class PageClassComponent implements OnInit {
  classList: Classe[] = [];
  subjectList:Subject[] = [];
  subjectClassList:Subject[] = [];

  p: number = 1;
  classFormGroup!: FormGroup;
  classFormGroup2!: FormGroup;
  subjectFormGroup!:FormGroup;

  submitted: boolean = false;
  sectionList: LabelValue[] = []
  classModel: Classe = new Classe();
  classeSubject:Classe=new Classe();
  class: Classe = new Classe(); // used for view 

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;

  constructor(
    private classService: ClassService,
    private sectionService: SectionService,
    private subjectService:SubjectService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {

    this.classFormGroup = new FormGroup({
      'levelClass': new FormControl('', Validators.required),
      'labelClass': new FormControl('', Validators.required),
      'firstSchoolYear': new FormControl('', Validators.required),
      'lastSchoolYear': new FormControl('', Validators.required),
      'section': new FormControl('', Validators.required),

    });

    this.classFormGroup2 = new FormGroup({
      'id': new FormControl(''),
      'levelClass': new FormControl('', Validators.required),
      'labelClass': new FormControl('', Validators.required),
      'firstSchoolYear': new FormControl('', Validators.required),
      'lastSchoolYear': new FormControl('', Validators.required),
      'section': new FormControl('', Validators.required),

    });
    this.subjectFormGroup=new FormGroup({
      'subject': new FormControl('', Validators.required),

    })

    this.getClassList();
    this.getSections();
    this.getSubjectList();
  }
  getSubjectList()
  {
    this.subjectService.findAllByClassesIsNull().subscribe(res => {
      this.subjectList = res
    } , error => {
        console.error(error)
    } , ()=> {

    })
  }

  getClassList() {
    this.classService.findAll().subscribe(res => {
      this.classList = res
    }, error => {
      console.error(error)
    }, () => {

    })
  }

  getSections() {
    this.sectionService.getSections().subscribe(
      res => {

        this.sectionList = res

        console.log(res)
      }, error => {
        console.error(error)
      }, () => {

      }
    )
  }

  public searchBy(key: string): void {

    const res: Classe[] = [];
    this.classList.forEach((e) => {

      if (e.levelClass.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.labelClass.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.section.label.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.classList = res;

    if (res.length === 0 || !key) {
      this.getClassList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  changeSection(event: any) {

    let section: Section = new Section();
    section.id = event;
    this.classModel.section = section;
  }
  AddMatiereToClass(){
    this.submitted = true;
    if (this.subjectFormGroup.invalid) {
      return;
    }
    let idSubject:number=this.subjectFormGroup.value.subject;
    console.log(this.classeSubject)
    let idClasse=this.classeSubject.id;
    this.classService.addSubjectToClasse(idSubject,idClasse)
      .subscribe({
        next: (res) => {
          this.getSubjectList();
          this.submitted = false;
          this.subjectFormGroup.reset();
          location.reload();
          this.toastrService.success('Success!', 'Votre matière a été ajoutée!');
        },
      });
    

  }
  addClass() {
    this.submitted = true;
    if (this.classFormGroup.invalid) {
      return;
    }
    this.classModel.levelClass = this.classFormGroup.value.levelClass;
    this.classModel.labelClass = this.classFormGroup.value.labelClass;
    this.classModel.firstSchoolYear = this.classFormGroup.value.firstSchoolYear;
    this.classModel.lastSchoolYear = this.classFormGroup.value.lastSchoolYear;

    this.classModel.section.id = this.classFormGroup.value.section

    this.classService.save(this.classModel)
      .subscribe({
        next: (res) => {

          this.closeModalBtn.nativeElement.click()
          this.getClassList();
          this.submitted = false;
          this.classModel = new Classe();
          this.classFormGroup.reset();
          this.toastrService.success('Success!', 'Votre classe a été ajoutée!');

        },
      });
  }

  getClass(classId: number) {
    if (classId != undefined && classId != null) {
      this.classService.findById(classId).subscribe(
        res => {
          this.classModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.classFormGroup2.get("levelClass")?.setValue(this.classModel.levelClass);
          this.classFormGroup2.get("labelClass")?.setValue(this.classModel.labelClass);
          this.classFormGroup2.get("section")?.setValue(this.classModel.section.id);
          this.classFormGroup2.get("firstSchoolYear")?.setValue(this.classModel.firstSchoolYear);
          this.classFormGroup2.get("lastSchoolYear")?.setValue(this.classModel.lastSchoolYear);

          this.classFormGroup2.updateValueAndValidity()
        });
    }
  }

  updateClass() {
    this.submitted = true;
    if (this.classFormGroup2.invalid) {
      return;
    }
    this.classModel.levelClass = this.classFormGroup2.value.levelClass;
    this.classModel.labelClass = this.classFormGroup2.value.labelClass;
    this.classModel.firstSchoolYear = this.classFormGroup2.value.firstSchoolYear;
    this.classModel.lastSchoolYear = this.classFormGroup2.value.lastSchoolYear;


    this.classService.save(this.classModel)
      .subscribe({
        next: (res) => {
          this.toastrService.success('Success!', 'Votre classe a été modifiée!');
          this.submitted = false;
          this.classModel = new Classe();
          this.classFormGroup2.reset();
          this.closeUpdateModalBtn.nativeElement.click();
          this.getClassList();
        },
      });
  }

  deleteClass(classId: number) {
    if (classId != undefined && classId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette classe!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-la!',
        cancelButtonText: 'Non, gardez-la'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.classService.delete(classId)
            .subscribe(res => {
              this.getClassList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre classe a été supprimée.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre classe est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewClass(classId: number) {
    if (classId != undefined && classId != null) {
      this.class = new Classe();
      this.classService.findById(classId).subscribe(res => {
        this.class = res;
        console.log('view ', this.class)
      })
    }
  }
  listSubjectModal(classe:Classe){
    this.subjectClassList=classe.subjects;
    this.classeSubject=classe;
  }
}
