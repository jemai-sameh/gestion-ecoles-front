import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { School } from 'src/app/models/School';
import { Address } from 'src/app/models/address';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { AuthService } from 'src/app/services/auth/auth-service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';
//import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-page-teacher',
  templateUrl: './page-teacher.component.html',
  styleUrls: ['./page-teacher.component.scss']
})
export class PageTeacherComponent implements OnInit {

  teacherList: Teacher[] = [];
  p: number = 1;
  teacherFormGroup!: FormGroup;
  teacherFormGroup2!: FormGroup;

  submitted: boolean = false;
  subjectList: Subject[] = [];
  teacherModel: Teacher = new Teacher();
  teacher: Teacher = new Teacher(); // used for view 
  adr: Address = new Address();
  adr1: Address[] = [];
  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/img/avatar.png'
  idSchool!: number;
  role!:string
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  user!: any
  constructor(
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);
    this.role=this.authService.getRole();

  }
  ngOnInit(): void {
    this.idSchool = (this.role == 'SUPER_ADMIN') ? null :(this.role == 'ADMIN')?this.user?.id:this.user?.school?.id;


    this.teacherFormGroup = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),

    });

    this.teacherFormGroup2 = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),

    });

    this.getTeacherList();
    this.getSubjects();
  }

  getTeacherList() {
    this.teacherService.getTeacherList(this.idSchool).subscribe(res => {
      this.teacherList = res
    }, error => {
      console.error(error)
    }, () => {

    })
  }

  getSubjects() {
    this.subjectService.getSubjectList(this.idSchool).subscribe(
      res => {

        this.subjectList = res
      }, error => {
        console.error(error)
      }, () => {

      }
    )
  }

  public searchBy(key: string): void {

    const res: Teacher[] = [];
    this.teacherList.forEach((e) => {

      if (e.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.subject.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.teacherList = res;

    if (res.length === 0 || !key) {
      this.getTeacherList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  changeSubject(event: any) {

    let subject: Subject = new Subject();
    subject.id = event;
    this.teacherModel.subject = subject;
  }

  addTeacher() {

    this.submitted = true;
    if (this.teacherFormGroup.invalid) return;



    this.adr.address1 = this.teacherFormGroup.value.address1;
    this.adr.address2 = this.teacherFormGroup.value.address2;
    this.adr.city = this.teacherFormGroup.value.city;
    this.adr.zipCode = this.teacherFormGroup.value.zipCode;
    this.adr.country = this.teacherFormGroup.value.country;
    this.teacherModel.address = this.adr;
    this.teacherModel.firstName = this.teacherFormGroup.value.firstName;
    this.teacherModel.lastName = this.teacherFormGroup.value.lastName;

    this.teacherModel.email = this.teacherFormGroup.value.email;
    this.teacherModel.password = this.teacherFormGroup.value.password;
    this.teacherModel.telephone = this.teacherFormGroup.value.telephone;
    this.teacherModel.image = this.teacherFormGroup.value.image;
    this.teacherModel.subject.id = this.teacherFormGroup.value.subject
    let sch:School=new School();
    sch.id=this.idSchool
    this.teacherModel.school= sch

    this.teacherService.saveTeacher(this.teacherModel)
      .subscribe({
        next: (res) => {
          this.teacherService.uploadTeacherImage(res.id, this.file).subscribe(
            res => { }, error => { }, () => {
              this.closeModalBtn.nativeElement.click()
              this.getTeacherList();
              this.submitted = false;
              this.teacherModel = new Teacher();
              this.teacherFormGroup.reset();
              this.toastrService.success('Success!', 'Votre professeur a été ajouté!');
            });





        },
      });

  }

  getTeacher(teacherId: number) {

    if (teacherId != undefined && teacherId != null) {
      this.teacherService.getTeacherById(teacherId).subscribe(
        res => {
          console.log(res);
          this.teacherModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.imgUrl = this.teacherModel.image;
          this.teacherFormGroup2.get("firstName")?.setValue(this.teacherModel.firstName);
          this.teacherFormGroup2.get("lastName")?.setValue(this.teacherModel.lastName);
          this.teacherFormGroup2.get("address1")?.setValue(this.teacherModel.address.address1);
          this.teacherFormGroup2.get("address2")?.setValue(this.teacherModel.address.address2);
          this.teacherFormGroup2.get("city")?.setValue(this.teacherModel.address.city);
          this.teacherFormGroup2.get("zipCode")?.setValue(this.teacherModel.address.zipCode);
          this.teacherFormGroup2.get("country")?.setValue(this.teacherModel.address.country);
          this.teacherFormGroup2.get("email")?.setValue(this.teacherModel.email);
          this.teacherFormGroup2.get("telephone")?.setValue(this.teacherModel.telephone);
          this.teacherFormGroup2.get("image")?.setValue(this.teacherModel.image);
         // this.teacherFormGroup2.get("password")?.setValue(this.teacherModel.password);
          this.teacherFormGroup2.get("subject")?.setValue(this.teacherModel.subject.id);
          this.teacherFormGroup2.updateValueAndValidity()
        });
    }
  }

  updateTeacher() {
    this.submitted = true;
    if (this.teacherFormGroup2.invalid) {
      return;
    }

    this.adr.address1 = this.teacherFormGroup2.value.address1;
    this.adr.address2 = this.teacherFormGroup2.value.address2;
    this.adr.city = this.teacherFormGroup2.value.city;
    this.adr.zipCode = this.teacherFormGroup2.value.zipCode;
    this.adr.country = this.teacherFormGroup2.value.country;
    this.teacherModel.address = this.adr;

    this.teacherModel.firstName = this.teacherFormGroup2.value.firstName;
    this.teacherModel.lastName = this.teacherFormGroup2.value.lastName;

    this.teacherModel.email = this.teacherFormGroup2.value.email;
    this.teacherModel.telephone = this.teacherFormGroup2.value.telephone;
   // this.teacherModel.password = this.teacherFormGroup2.value.password;
    this.teacherModel.image = this.teacherFormGroup2.value.image;
    this.teacherModel.subject.id = this.teacherFormGroup2.value.subject;
    let sch:School=new School();
    sch.id=this.idSchool;
    this.teacherModel.school= sch


    this.teacherService.saveTeacher(this.teacherModel)
      .subscribe({
        next: (res) => {
          this.teacherService.uploadTeacherImage(res.id, this.file).subscribe(
            res => { }, error => { }, () => {
              this.submitted = false;
              this.teacherModel = new Teacher();
              this.teacherFormGroup2.reset();
              this.getTeacherList();
            });
          this.closeUpdateModalBtn.nativeElement.click();
          this.getTeacherList();
          //alertifyjs.set("notifier","position","top-right");
          //alertifyjs.success('Votre professeur a été modifié!');
          this.toastrService.success('Success!', 'Votre professeur a été modifié!');


        },
      });
  }

  deleteTeacher(teacherId: number) {
    if (teacherId != undefined && teacherId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer ce professeur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.teacherService.deleteTeacher(teacherId)
            .subscribe(res => {
              this.getTeacherList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre professeur a été supprimé.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre professeur est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewTeacher(teacherId: number) {
    if (teacherId != undefined && teacherId != null) {
      this.teacher = new Teacher();
      this.teacherService.findTeacherById(teacherId).subscribe(res => {
        this.teacher = res;
        console.log('view ', this.teacher)
      })
    }
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0) as File;
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  changeSource(event: any) {
    event.target.src = "assets/img/avatar.png";
  }

  UpdateStatus(id: number, status: number) {
    this.teacherService
      .EnabledOrDisabledStatus(id, status)
      .subscribe((response) => {
        this.getTeacherList();
        this.toastrService.success('Success!', status == 1
          ? "Admin a était mise a jour a l'etat accepter"
          : "Admin a était mise a jour a l'etat refuser",);
      });
  }
}
