import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Absence } from 'src/app/models/absence';
import { NameValue } from 'src/app/models/nameValue';
import { Student } from 'src/app/models/student';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { StudentService } from 'src/app/services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-absence',
  templateUrl: './page-absence.component.html',
  styleUrls: ['./page-absence.component.scss']
})
export class PageAbsenceComponent implements OnInit {

  absenceList:Absence[] = [];
  p: number = 1;
  absenceFormGroup!: FormGroup;
  absenceFormGroup2!: FormGroup;

  submitted:boolean = false;
  studentList : NameValue[] = [];
  absenceModel:Absence = new Absence();
  absence:Absence = new Absence() ; // used for view 

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;

  constructor(
              private absenceService:AbsenceService, 
              private studentService:StudentService,
              private toastrService: ToastrService
              ) { }
  ngOnInit(): void {

    this.absenceFormGroup = new FormGroup({
      'dateAbsence' : new FormControl('', Validators.required),
      'type' : new FormControl('', Validators.required),
      'student' : new FormControl('', Validators.required),

    });

    this.absenceFormGroup2 = new FormGroup({
      'id':  new FormControl(''),
      'dateAbsence' : new FormControl('', Validators.required),
      'type' : new FormControl('', Validators.required),
      'student' : new FormControl('', Validators.required),

    });

    this.getAbsenceList();
    this.getStudents();
  }

  getAbsenceList()
  {
    this.absenceService.getAbsenceList().subscribe(res => {
      this.absenceList = res
    } , error => {
        console.error(error)
    } , ()=> {

    })
  }

  getStudents()
  {
    this.studentService.getAllStudent().subscribe(
      res => {
        
        this.studentList = res
      } , error => {
        console.error(error)
      } , () => {

      }
    )
  }

  public searchBy(key: string) : void {
    
    const res: Absence[] = [];
    this.absenceList.forEach((e) => {
      
      if (e.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || e.student.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.student.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      } 
      
    });
    
    this.absenceList = res;
    
    if (res.length === 0 || !key) {
      this.getAbsenceList();
    }
    
  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1:any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  changeStudent(event:any)
  {
   
    let student:Student  = new Student() ;
    student.id = event;
    this.absenceModel.student=  student;
  }

  addAbsence()
  {
    this.submitted = true;
    if(this.absenceFormGroup.invalid)
    {
      return ;
    }
      this.absenceModel.dateAbsence = this.absenceFormGroup.value.dateAbsence;
      this.absenceModel.type = this.absenceFormGroup.value.type;
      this.absenceModel.student.id = this.absenceFormGroup.value.student
    
      this.absenceService.saveAbsence(this.absenceModel)
        .subscribe({
          next: (res) => {
            
            this.closeModalBtn.nativeElement.click()
            this.getAbsenceList();
            this.submitted = false ; 
            this.absenceModel = new Absence();
            this.absenceFormGroup.reset();
            this.toastrService.success('Success!', 'Votre absence a été ajoutée!');
            
          },
        });
  }

  getAbsence(absenceId:number)
  {
    if(absenceId!=undefined && absenceId !=null)
    {
      this.absenceService.getAbsenceById(absenceId).subscribe(
        res=>{
          this.absenceModel=res 
      },error=>{
        console.error(error) 
      },()=>{ 
        this.absenceFormGroup2.get("dateAbsence")?.setValue(this.absenceModel.dateAbsence);
        this.absenceFormGroup2.get("type")?.setValue(this.absenceModel.type);
        this.absenceFormGroup2.get("student")?.setValue(this.absenceModel.student.id);
        this.absenceFormGroup2.updateValueAndValidity()
      });
    }
  }

  updateAbsence()
  {
    this.submitted = true;
    if(this.absenceFormGroup2.invalid)
    {
      return ;
    }
    this.absenceModel.dateAbsence = this.absenceFormGroup2.value.dateAbsence;
    this.absenceModel.type = this.absenceFormGroup2.value.type;
    
    this.absenceService.saveAbsence(this.absenceModel)
    .subscribe({
      next: (res) => {
        this.toastrService.success('Success!', 'Votre absence a été modifiée!');
        this.submitted = false ; 
        this.absenceModel = new Absence();
        this.absenceFormGroup2.reset();
        this.closeUpdateModalBtn.nativeElement.click();
        this.getAbsenceList();
      },
    });
  }

  deleteAbsence(absenceId:number)
  {
    if(absenceId!=undefined && absenceId !=null)
    {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette absence!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-la!',
        cancelButtonText: 'Non, gardez-la'
      }).then((result : any) => {
        if (result.value) {
         // alert(id);
          this.absenceService.deleteAbsence(absenceId)
          .subscribe(res=>{
            this.getAbsenceList();
          })
        Swal.fire(
          'Supprimé!',
          'Votre absence a été supprimée.',
          'success'
        )
     
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre absence est en sécurité 🙂',
          'error'
        )
        }
      })
    }
  }

  viewAbsence(absenceId:number)
  {
      if(absenceId!=undefined && absenceId !=null)
      {
        this.absence = new Absence();
        this.absenceService.getAbsenceById(absenceId).subscribe( res => {
          this.absence = res;
          console.log('view ' , this.absence)
        })
      }
  }

}
