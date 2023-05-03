import { School } from './../../models/School';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Classe } from 'src/app/models/classe';
import { Student } from 'src/app/models/student';
import { ClassService } from 'src/app/services/classe/class.service';
import { StudentService } from 'src/app/services/student/student.service';
import Swal from 'sweetalert2';
import { SchoolsService } from 'src/app/services/schools.service';
import { AuthService } from 'src/app/services/auth/auth-service';
import { SeanceService } from 'src/app/services/seance/seance.service';
import { Seance } from 'src/app/models/seance';
import { Absence } from 'src/app/models/absence';
import { AbsenceService } from 'src/app/services/absence/absence.service';
//import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-page-student',
  templateUrl: './page-student.component.html',
  styleUrls: ['./page-student.component.scss']
})
export class PageStudentComponent implements OnInit {

  studentList: Student[] = [];
  p: number = 1;
  studentFormGroup!: FormGroup;
  studentFormGroup2!: FormGroup;
  absenceFormGroup!:FormGroup;

  submitted: boolean = false;
  classList: Classe[] = [];
  schoolList: School[] = []
  seanceList:Seance[]=[];
  studentModel: Student = new Student();
  absenceModel:Absence=new Absence();
  student: Student = new Student(); // used for view 
  adr: Address = new Address();
  adr1: Address[] = [];
  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/img/avatar.png'
  idSchool!: number;
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  user!:any
  role!:any
  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private schoolService: SchoolsService,
    private absenceService:AbsenceService,
    private toastrService: ToastrService,
    private seanceService:SeanceService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);

  }
  ngOnInit(): void {
    this.role=this.authService.getRole()

    this.idSchool = (this.role == 'SUPER_ADMIN') ? null :(this.role == 'ADMIN')?this.user?.id:this.user?.school?.id;


    this.studentFormGroup = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'classe': new FormControl('', Validators.required),
      //'school': new FormControl('', Validators.required)

    });

    this.studentFormGroup2 = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'classe': new FormControl('', Validators.required),
      //'school': new FormControl('', Validators.required)


    });

    this.absenceFormGroup = new FormGroup({
      'dateAbsence': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'seance': new FormControl('', Validators.required),
    });

    this.getStudentList();
    this.getClasses();
    this.getSchools();
    this.getSeances();

  }

  getStudentList() {
    this.studentService.getStudentList(this.idSchool).subscribe(res => {
      this.studentList = res
    }, error => {
      console.error(error)
    }, () => {

    })
  }

  getClasses() {
    this.classService.findAll(this.idSchool).subscribe(
      res => {

        this.classList = res
      }, error => {
        console.error(error)
      }, () => {

      }
    )
  }
  getSeances() {
    this.seanceService.getSeanceList(this.idSchool).subscribe(
      res => {

        this.seanceList = res
      }, error => {
        console.error(error)
      }, () => {

      }
    )
  }
  getSchools() {
    this.schoolService.getSchoolList().subscribe(
      res => {

        this.schoolList = res
      }, error => {
        console.error(error)
      }, () => {

      }
    )
  }

  public searchBy(key: string): void {

    const res: Student[] = [];
    this.studentList.forEach((e) => {

      if (e.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.classe.labelClass.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.school.name.toLowerCase().indexOf(key.toLowerCase()) !== -1

      ) {
        res.push(e);
      }

    });

    this.studentList = res;

    if (res.length === 0 || !key) {
      this.getStudentList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  changeClass(event: any) {

    let classe: Classe = new Classe();
    classe.id = event;
    this.studentModel.classe = classe;
  }
  changeSchool(event: any) {

    let school: School = new School();
    school.id = event;
    this.studentModel.school = school;
  }

  addStudent() {

    this.submitted = true;
    if (this.studentFormGroup.invalid) {
      return;
    }


    this.adr.address1 = this.studentFormGroup.value.address1;
    this.adr.address2 = this.studentFormGroup.value.address2;
    this.adr.city = this.studentFormGroup.value.city;
    this.adr.zipCode = this.studentFormGroup.value.zipCode;
    this.adr.country = this.studentFormGroup.value.country;
    this.studentModel.address = this.adr;

    this.studentModel.firstName = this.studentFormGroup.value.firstName;
    this.studentModel.lastName = this.studentFormGroup.value.lastName;
    this.studentModel.dateOfBirth = this.studentFormGroup.value.dateOfBirth;
    this.studentModel.email = this.studentFormGroup.value.email;
    this.studentModel.telephone = this.studentFormGroup.value.telephone;
    this.studentModel.image = this.studentFormGroup.value.image;
    this.studentModel.classe.id = this.studentFormGroup.value.classe;
    this.studentModel.school.id = this.idSchool

    this.studentService.saveStudent(this.studentModel)
      .subscribe({
        next: (res) => {
          this.studentService.uploadStudentImage(res.id, this.file).subscribe(
            res => { }, error => { }, () => {
              this.closeModalBtn.nativeElement.click()
              this.getStudentList();
              this.submitted = false;
              this.studentModel = new Student();
              this.studentFormGroup.reset();
              this.toastrService.success('Success!', 'Votre élève a été ajouté!');
            });





        },
      });

  }

  getStudent(studentId: number) {

    if (studentId != undefined && studentId != null) {
      this.studentService.findStudentById(studentId).subscribe(
        res => {
          console.log(res);
          this.studentModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.imgUrl = this.studentModel.image;
          this.studentFormGroup2.get("firstName")?.setValue(this.studentModel.firstName);
          this.studentFormGroup2.get("lastName")?.setValue(this.studentModel.lastName);
          this.studentFormGroup2.get("dateOfBirth")?.setValue(this.studentModel.dateOfBirth);
          this.studentFormGroup2.get("email")?.setValue(this.studentModel.email);
          this.studentFormGroup2.get("telephone")?.setValue(this.studentModel.telephone);
          this.studentFormGroup2.get("image")?.setValue(this.studentModel.image);
          this.studentFormGroup2.get("address1")?.setValue(this.studentModel.address.address1);
          this.studentFormGroup2.get("address2")?.setValue(this.studentModel.address.address2);
          this.studentFormGroup2.get("city")?.setValue(this.studentModel.address.city);
          this.studentFormGroup2.get("zipCode")?.setValue(this.studentModel.address.zipCode);
          this.studentFormGroup2.get("country")?.setValue(this.studentModel.address.country);
          this.studentFormGroup2.get("classe")?.setValue(this.studentModel.classe.id);
          this.studentFormGroup2.get("school")?.setValue(this.studentModel.school.id);

          this.studentFormGroup2.updateValueAndValidity()
        });
    }
  }
  addAbsence() {
    this.submitted = true;
    if (this.absenceFormGroup.invalid) {
      return;
    }
    this.absenceModel.dateAbsence = this.absenceFormGroup.value.dateAbsence;
    this.absenceModel.type = this.absenceFormGroup.value.type;
    this.absenceModel.student.id = this.studentModel.id;
    let s: Seance = new Seance();
    s.id = this.absenceFormGroup.value.seance;
    this.absenceModel.seance = s;



    this.absenceService.saveAbsence(this.absenceModel)
      .subscribe({
        next: (res) => {

          this.closeModalBtn.nativeElement.click()
          this.getStudentList();
          this.submitted = false;
          this.absenceModel = new Absence();
          this.studentModel = new Student();

          this.absenceFormGroup.reset();
          this.toastrService.success('Success!', 'Votre absence a été ajoutée!');

        },
      });
  }
  updateStudent() {
    this.submitted = true;
    if (this.studentFormGroup2.invalid) {
      return;
    }

    this.adr.address1 = this.studentFormGroup2.value.address1;
    this.adr.address2 = this.studentFormGroup2.value.address2;
    this.adr.city = this.studentFormGroup2.value.city;
    this.adr.zipCode = this.studentFormGroup2.value.zipCode;
    this.adr.country = this.studentFormGroup2.value.country;
    this.studentModel.address = this.adr;

    this.studentModel.firstName = this.studentFormGroup2.value.firstName;
    this.studentModel.lastName = this.studentFormGroup2.value.lastName;
    this.studentModel.dateOfBirth = this.studentFormGroup2.value.dateOfBirth;
    this.studentModel.email = this.studentFormGroup2.value.email;
    this.studentModel.telephone = this.studentFormGroup2.value.telephone;
    this.studentModel.image = this.studentFormGroup2.value.image;
    this.studentModel.classe.id = this.studentFormGroup2.value.classe;
    this.studentModel.school.id = this.studentFormGroup2.value.school;


    this.studentService.saveStudent(this.studentModel)
      .subscribe({
        next: (res) => {
          this.studentService.uploadStudentImage(res.id, this.file).subscribe(
            res => { }, error => { }, () => {

              this.submitted = false;
              this.studentModel = new Student();
              this.studentFormGroup2.reset();
              this.getStudentList();
            });
          this.closeUpdateModalBtn.nativeElement.click();
          this.getStudentList();
          this.toastrService.success('Success!', 'Votre élève a été modifié!');


        },
      });
  }

  deleteStudent(studentId: number) {
    if (studentId != undefined && studentId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cet élève!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.studentService.deleteStudent(studentId)
            .subscribe(res => {
              this.getStudentList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre élève a été supprimé.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre élève est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewStudent(studentId: number) {
    if (studentId != undefined && studentId != null) {
      this.student = new Student();
      this.studentService.getStudentById(studentId).subscribe(res => {
        this.student = res;
        console.log('view ', this.student)
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
    this.studentService
      .EnabledOrDisabledStatus(id, status)
      .subscribe((response) => {
        this.getStudentList();
        this.toastrService.success('Success!', status == 1
          ? "Etudiant(e) a était mise a jour a l'etat accepter"
          : "Etudiant(e) a était mise a jour a l'etat refuser",);
      });
  }
}
