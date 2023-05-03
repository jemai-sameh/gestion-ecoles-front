
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassRoom } from 'src/app/models/classroom';
import { School } from 'src/app/models/School';
import { AuthService } from 'src/app/services/auth/auth-service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SchoolsService } from 'src/app/services/schools.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {
  id: any
  submitted = false;
  p: number = 1;

  // classrooms: any;
  classroom: ClassRoom = new ClassRoom();
  classRoomList: ClassRoom[] = [];
  schoolList: School[] = [];
  user!: any;
  classroomes !: ClassRoom;
  ClassRoomDetail !: FormGroup;
  schools: School[] = [];
  idSchool!: number;
  role!:string;
  constructor(private router: Router, private formBuilder: FormBuilder, private schoolsService: SchoolsService, private classroomService: ClassroomService,
    private authService: AuthService
  ) {
    var user1: any = localStorage.getItem('user');
    this.user = JSON.parse(user1);
    this.role=this.authService.getRole();

  }
  ngOnInit(): void {
    this.idSchool = (this.role == 'SUPER_ADMIN') ? null : (this.role == 'ADMIN') ? this.user?.id : this.user?.school?.id;

    this.reloadData();
    this.getSchools();
    // this.classroomService.getClassroomList().subscribe(data => this.classRoomList = data);


    this.ClassRoomDetail = new FormGroup({
      //'school': new FormControl('', Validators.required),
      'classRoomNumber': new FormControl('', Validators.required),
      'bloc': new FormControl('', Validators.required)
    });
  }


  reloadData() {
    this.classroomService.getClassroomList(this.idSchool)
      .subscribe(res => { this.classRoomList = res }, error => {
        console.error(error)
      }, () => { });

  }
  viewClassRoom(id: any) {
    this.classroomes = new ClassRoom();
    this.classroomService.getClassRoom(id).subscribe(res => {
      this.classroomes = res;
    })
  }


  //add new classroom
  addClassRoom(): void {

    this.classroom.id = this.ClassRoomDetail.value.id;
    this.classroom.classRoomNumber = this.ClassRoomDetail.value.classRoomNumber;
    this.classroom.bloc = this.ClassRoomDetail.value.bloc;
    this.classroom.school.id = this.idSchool
    this.classroomService.addClassRoom(this.classroom)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Classroom created successfully');
          location.reload();

        },
      });


  }
  // delete classroom
  classroomDelete(id: any) {
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
        this.classroomService.deleteClassRoom(id)
          .subscribe(res => {
            this.reloadData();
          })
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )

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
  getClassroom(id: any) {
    //alert(this.idEncad);
    this.classroomService.getClassRoom(id).subscribe(res => {
      this.classroom = res
    }, error => {
      console.error(error)
    }, () => { });

  }
  //Update classroom
  Updateclassroom(): void {
    if (!this.submitted) {
      this.classroomService.addClassRoom(this.classroom)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert('classroom updated successfully');
            location.reload();
          },
        });
    }
  }

  navigate(): void { }

  public searchBy(key: string): void {

    const res: ClassRoom[] = [];
    this.classRoomList.forEach((e) => {
      if (e.classRoomNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.bloc.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || e.school.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        res.push(e);
      }

    });

    this.classRoomList = res;

    if (res.length === 0 || !key) {
      this.reloadData();
    }

  }

  getSchools() {
    this.schoolsService.getSchoolList().subscribe({
      next: res => {
        this.schoolList = res;
        console.log(this.schoolList)
      },
      error: error => {
        console.error(error, error);
      }
    })

  }

  changeSchool(event: any) {

    let school: School = new School();
    school.id = event;
    this.classroom.school = school;
    console.log(this.classroom.school.id)
  }

  key1: string = 'id';
  reverse: boolean = false;
  sort(key1: any) {
    this.key1 = key1;
    this.reverse = !this.reverse;
  }

}
