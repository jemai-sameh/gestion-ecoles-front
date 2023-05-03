import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/School';
import { SchoolsService } from 'src/app/services/schools.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  id: any
  submitted = false;
  schools: any;
  school: School = new School();
  sch: School[] = [];
  admin!:Admin;
  Scho !: School;
  idschool!: number;
  SchoolDetail !: FormGroup;
  adminList: Admin[] = [];
  AdminsListSchool: Admin[] = [];
  adminFormGroup!: FormGroup;
  constructor(private router: Router, private toastrService: ToastrService, 
    private formBuilder: FormBuilder, private adminService: AdminService, 
    private schoolService: SchoolsService) { }

  ngOnInit(): void {
    this.reloadData();
    this.schoolService.getSchoolList().subscribe(data => {this.schools = data; console.log(this.schools)});

    this.SchoolDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      address: ['']
    });

    this.SchoolDetail = new FormGroup({
      'name': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required)
    });
    this.adminFormGroup = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'telephone': new FormControl('', Validators.required)
    });
  }
  // Get
  reloadData() {
    this.schoolService.getSchoolList()
      .subscribe(res => { this.schools = res }, error => {
        console.error(error)
      }, () => { });

  }
  viewSchool(id: any) {
    this.Scho = new School();
    this.schoolService.getSchool(id).subscribe(res => {
      this.Scho = res;
    })
  }

  viewAdmin(admin: Admin) {
    this.admin=admin
    /*this.adminService.findById(id).subscribe(res => {
      this.admin = res;
    })*/
  }

  searchBy(key: string): void {

    const res: School[] = [];
    this.sch.forEach((e) => {

      if (e.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.sch = res;

    if (res.length === 0 || !key) {
      this.reloadData();
    }

  }

  //ADD School
  ajoutSchool(): void {
    this.school=new School();
    this.school.id = 0;
    this.school.name = this.SchoolDetail.value.name;
    this.school.address = this.SchoolDetail.value.address;
    console.log(this.school)
    this.schoolService.ajouterSchool(this.school)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('School created successfully');
          location.reload();

        },
      });

  }
  // deleteSociete
  deleteSchool(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // alert(id);
        this.schoolService.deleteSchool(id)
          .subscribe(res => {
            this.reloadData();
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )

          })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe 🙂',
          'error'
        )
      }
    })
  }
  // GetById
  getSchool(id: any) {
    //alert(this.idEncad);
    this.schoolService.getSchool(id).subscribe(res => {
      this.school = res
    }, error => {
      console.error(error)
    }, () => { });

  }
  //Update School
  ModifSchool(): void {
    if (!this.submitted) {
      this.schoolService.ajouterSchool(this.school)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert('School updated successfully');
            location.reload();
          },
        });
    }
  }

  navigate(): void { }

  addSchool(s:School){
    this.school=s
  }
  getAdmin(school:School){
    this.school=school;
    this.adminService.findAdminBySchool(school.id).subscribe({
      next:data=>this.admin=data,
      error:err=>this.admin=new Admin()
    })
  }
  addadmin() {

    this.submitted = true;
    if (this.adminFormGroup.invalid) {
      return;
    }

    let adminModel: Admin = new Admin();
    //adminModel.id=this.school.id;
    adminModel.firstName = this.adminFormGroup.value.firstName;
    adminModel.lastName = this.adminFormGroup.value.lastName;
    adminModel.email = this.adminFormGroup.value.email;
    adminModel.telephone = this.adminFormGroup.value.telephone;
    adminModel.password=this.adminFormGroup.value.password
    adminModel.active=false
    //adminModel.school.id = this.school.id;


    this.adminService.affectAdminToSchool(adminModel,this.school.id)
      .subscribe({
        next: (res) => {
          this.reloadData();
          this.submitted = false;
          this.adminFormGroup.reset();
          location.reload();
          this.toastrService.success('Success!', 'Votre admin a été ajouté!');

        }
      });


  }
  findAllAdminBySchool(idClass:number){
    console.log(idClass)
    this.adminService.findAllAdminBySchool(idClass).subscribe(res => {
      this.AdminsListSchool = res
    } , error => {
        console.error(error)
    } , ()=> {

    })
  }
}
