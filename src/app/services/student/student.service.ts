import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NameValue } from 'src/app/models/nameValue';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseurlstudent :string = environment.baseurl +"/students"

  constructor(private http: HttpClient) { }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post(`${this.baseurlstudent}/addOrUpdate`, student)
    .pipe(
      map((response:any) => response as Student)
    );
  }
  uploadStudentImage(id:number,image:File): Observable<HttpEvent<{}>> {
    const formData:FormData=new FormData();
    formData.append(`image`,image)
    let url=this.baseurlstudent+"/uploadStudentImage/"+id;
    const req=new HttpRequest('POST',url,formData,{reportProgress:true,responseType:'text'})
    return this.http.request(req);
  }
  getStudentList(id:number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseurlstudent}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as Student[])
    );
    
  }
  
  /*
  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseurlstudent}/listeStudent`)
    .pipe(
      map((response:any) => response as Student[])
    );
    
  }*/
  deleteStudent(id: any): Observable<any> {
    return this.http.delete(`${this.baseurlstudent}/deleteStudent/${id}`,{ responseType: 'text' });
  }
  findStudentById(id: number): Observable<Student> {
    return this.http.get(`${this.baseurlstudent}/getbyid/${id}`).pipe(
      map((response:any) => response as Student)
    );
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get(`${this.baseurlstudent}/findStudent/${id}`).pipe(
      map((response:any) => response as Student)
    );
  }

  getAllStudent(idSchool:number): Observable<NameValue[]> {
    return this.http.get<NameValue[]>(`${this.baseurlstudent}/allStudent/${idSchool}`)
    .pipe(
      map((response:any) => response as NameValue[])
    );
  }
  EnabledOrDisabledStatus(id:number,status:number): Observable<any> {
    return this.http.post(`${this.baseurlstudent}/EnabledOrDisabledStatus/${id}/${status}`,{});
  }
}
