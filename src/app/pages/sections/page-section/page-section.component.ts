import { AuthService } from 'src/app/services/auth/auth-service';
import { School } from './../../../models/School';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section/section.service';
import Swal from 'sweetalert2';
import { LabelValue } from 'src/app/models/labelValue';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent implements OnInit {
  user!:any
  sectionList:Section[] = [];
  isDisabled: boolean = true;
  p: number = 1;
  sectionFormGroup!: FormGroup;
  sectionFormGroup2!: FormGroup;
  submitted:boolean = false;
  sectionModel:Section = new Section();
  section:Section = new Section() ; // used for view 

  letters!:string;
  idSchool!:number;
  role!:string

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;

  constructor(
              private sectionService:SectionService,
              private toastrService: ToastrService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);
    this.role = this.authService.getRole()


  }
  ngOnInit(): void {
    this.idSchool = (this.authService.getRole() == 'SUPER_ADMIN') ? null :(this.authService.getRole() == 'ADMIN')?this.user?.id:this.user?.school?.id;

    this.sectionFormGroup = new FormGroup({
      'code' : new FormControl({value: '', disabled: true}, Validators.required),
      'label' : new FormControl('', Validators.required)

    });

    this.sectionFormGroup2 = new FormGroup({
      'id':  new FormControl(''),
      'code' : new FormControl({value: '', disabled: true}, Validators.required),
      'label' : new FormControl('', Validators.required)

    });

    this.getSectionList();
  }

  getSectionList()
  {
    this.sectionService.getSectionList(this.idSchool).subscribe(res => {
      this.sectionList = res
    } , error => {
        console.error(error)
    } , ()=> {

    })
  }

  public searchBy(key: string) : void {
    
    const res: Section[] = [];
    this.sectionList.forEach((e) => {
      
      if (e.code.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || e.label.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      } 
      
    });
    
    this.sectionList = res;
    
    if (res.length === 0 || !key) {
      this.getSectionList();
    }
    
  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1:any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  addSection()
  {  
    this.submitted = true;
    if(this.sectionFormGroup.invalid)
    {
      return ;
    }
      this.sectionModel.code = this.sectionFormGroup.get("code")?.value;
      this.sectionModel.label = this.sectionFormGroup.value.label
      this.sectionModel.school.id=this.idSchool

      this.sectionService.saveSection(this.sectionModel)
        .subscribe({
          next: (res) => {
            
            this.closeModalBtn.nativeElement.click()
            this.getSectionList();
            this.submitted = false ; 
            this.sectionModel = new Section();
            this.sectionFormGroup.reset();
            this.toastrService.success('Success!', 'Votre filière a été ajoutée!');
            
          },
        });
        
  }

  getSection(sectionId:number)
  {
    if(sectionId!=undefined && sectionId !=null)
    {
      this.sectionService.getSectionById(sectionId).subscribe(
        res=>{
          this.sectionModel=res 
      },error=>{
        console.error(error) 
      },()=>{ 
        this.sectionFormGroup2.get("code")?.setValue(this.sectionModel.code);
        this.sectionFormGroup2.get("label")?.setValue(this.sectionModel.label);
        this.sectionFormGroup2.updateValueAndValidity()
      });
    }
  }

  updateSection()
  {
    this.submitted = true;
    if(this.sectionFormGroup2.invalid)
    {
      return ;
    }
    this.sectionModel.code = this.sectionFormGroup2.get("code")?.value;
    this.sectionModel.label = this.sectionFormGroup2.value.label;
    this.sectionModel.school.id=this.idSchool

    
    this.sectionService.saveSection(this.sectionModel)
    .subscribe({
      next: (res) => {
        this.toastrService.success('Success!', 'Votre filière a été modifiée!');
        this.submitted = false ; 
        this.sectionModel = new Section();
        this.sectionFormGroup2.reset();
        this.closeUpdateModalBtn.nativeElement.click();
        this.getSectionList();
      },
    });
  }

  deleteSection(sectionId:number)
  {
    if(sectionId!=undefined && sectionId !=null)
    {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette filière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-la!',
        cancelButtonText: 'Non, gardez-la'
      }).then((result : any) => {
        if (result.value) {
         // alert(id);
          this.sectionService.deleteSection(sectionId)
          .subscribe(res=>{
            this.getSectionList();
          })
        Swal.fire(
          'Supprimé!',
          'Votre filière a été supprimée.',
          'success'
        )
     
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre filière est en sécurité 🙂',
          'error'
        )
        }
      })
    }
  }

  viewSection(sectionId:number)
  {
      if(sectionId!=undefined && sectionId !=null)
      {
        this.section = new Section();
        this.sectionService.getSectionById(sectionId).subscribe( res => {
          this.section = res;
          console.log('view ' , this.section)
        })
      }
  }


  changeGenericCode(event: any,name:string){
    this.sectionModel.label = this.sectionFormGroup.value.label

    let words = this.sectionModel.label.split(" ");
    let premieresLettres:string[] = [];
    this.letters=''
    words.forEach(word => {
      this.letters+=word.charAt(0).toLocaleUpperCase();
    });
    if (name=="sectionFormGroup")
      this.sectionFormGroup.get("code")?.setValue(this.letters);
    if (name=="sectionFormGroup2")
           this.sectionFormGroup2.get("code")?.setValue(this.letters);
    
 
  }
}
