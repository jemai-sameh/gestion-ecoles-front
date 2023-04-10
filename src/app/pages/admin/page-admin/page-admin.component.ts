import { Admin } from './../../../models/admin';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SchoolsService } from 'src/app/services/schools.service';
import { School } from 'src/app/models/School';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
  
  adminList: Admin[] = [];
  p: number = 1;
  adminFormGroup!: FormGroup;

  submitted: boolean = false;
  schoolList: School[] = []
  adminModel: Admin = new Admin();
  admin: Admin = new Admin();  

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;

  constructor(
    private adminService: AdminService,
    private schoolService: SchoolsService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {

    this.adminFormGroup = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required),
      'school': new FormControl('', Validators.required)

    });

  
    this.getAdminList();
    this.getSchools();

  }

  getAdminList() {
    this.adminService.findAllAdmin().subscribe({
      next:res=>this.adminList=res,
      error:err=>console.error(err)
    })
  }

  getSchools() {
    this.schoolService.findAllByAdminIsNull().subscribe({
      next:res=>this.schoolList=res,
      error:err=>console.error(err)
    })
  }

  public searchBy(key: string): void {

    const res: Admin[] = [];
    this.adminList.forEach((e) => {

      if (e.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.school.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) 
        res.push(e);
      

    });

    this.adminList = res;

    if (res.length === 0 || !key) {
      this.getAdminList();
    }

  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

  
  changeSchool(event: any) {
    let school: School = new School();
    school.id = event;
    this.adminModel.school = school;
  }

  addadmin() {

    this.submitted = true;
    if (this.adminFormGroup.invalid) {
      return;
    }



    this.adminModel.firstName = this.adminFormGroup.value.firstName;
    this.adminModel.lastName = this.adminFormGroup.value.lastName;
    this.adminModel.email = this.adminFormGroup.value.email;
    this.adminModel.telephone = this.adminFormGroup.value.telephone;
    this.adminModel.school.id = this.adminFormGroup.value.school


    this.adminService.save(this.adminModel)
      .subscribe({
        next: (res) => {
              this.closeModalBtn.nativeElement.click()
              this.getAdminList();
              this.submitted = false;
              this.adminModel = new Admin();
              this.adminFormGroup.reset();
              this.toastrService.success('Success!', 'Votre admin a été ajouté!');
            
     }});

  }

  getadmin(adminId: number) {

    if (adminId != undefined && adminId != null) {
      this.adminService.findById(adminId).subscribe(
        res => {
          console.log(res);
          this.adminModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.adminFormGroup.get("firstName")?.setValue(this.adminModel.firstName);
          this.adminFormGroup.get("lastName")?.setValue(this.adminModel.lastName);
          this.adminFormGroup.get("email")?.setValue(this.adminModel.email);
          this.adminFormGroup.get("telephone")?.setValue(this.adminModel.telephone);
          this.adminFormGroup.get("school")?.setValue(this.adminModel.school.id);
          this.adminFormGroup.updateValueAndValidity()
        });
    }
  }

  

  delete(adminId: number) {
    if (adminId != undefined && adminId != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cet élève!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          this.adminService.delete(adminId)
            .subscribe(res => {
              this.getAdminList();
            })
          Swal.fire(
            'Supprimé!',
            'Votre admin a été supprimé.',
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

  viewadmin(adminId: number) {
    if (adminId != undefined && adminId != null) {
      this.admin = new Admin();
      this.adminService.findById(adminId).subscribe(res => {
        this.admin = res;
        console.log('view ', this.admin)
      })
    }
  }


  changeSource(event: any) {
    event.target.src = "assets/img/avatar.png";
  }

  UpdateStatus(id:number, status:number) {
     this.adminService
      .EnabledOrDisabledStatus(id, status)
      .subscribe((response) => {
        this.getAdminList();
        this.toastrService.success('Success!', status == 1
        ? "Admin a était mise a jour a l'etat accepter"
        : "Admin a était mise a jour a l'etat refuser",);
      });
  }

}
