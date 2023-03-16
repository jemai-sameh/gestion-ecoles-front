import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/teacher';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseurlteacher :string = environment.baseurl +"/teacher"

  constructor(private http: HttpClient) { }

  saveTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post(`${this.baseurlteacher}/saveOrUpdate`, teacher)
    .pipe(
      map((response:any) => response as Teacher)
    );
  }
  uploadTeacherImage(id:number,image:File): Observable<HttpEvent<{}>> {
    const formData:FormData=new FormData();
    formData.append(`image`,image)
    let url=this.baseurlteacher+"/uploadTeacherImage/"+id;
    const req=new HttpRequest('POST',url,formData,{reportProgress:true,responseType:'text'})
    return this.http.request(req);
  }
  getTeacherList(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseurlteacher}/listerTeacher`)
    .pipe(
      map((response:any) => response as Teacher[])
    );
    
  }
  deleteTeacher(id: any): Observable<any> {
    return this.http.delete(`${this.baseurlteacher}/delete/${id}`,{ responseType: 'text' });
  }
  findTeacherById(id: number): Observable<Teacher> {
    return this.http.get(`${this.baseurlteacher}/getTeacher/${id}`).pipe(
      map((response:any) => response as Teacher)
    );
  }
  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get(`${this.baseurlteacher}/findTeacher/${id}`).pipe(
      map((response:any) => response as Teacher)
    );
  }
  EnabledOrDisabledStatus(id:number,status:number): Observable<any> {
    return this.http.post(`${this.baseurlteacher}/EnabledOrDisabledStatus/${id}/${status}`,{});
  }
}
