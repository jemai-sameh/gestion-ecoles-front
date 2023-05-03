import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClassRoom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
  
})
export class ClassroomService {
  baseurl :string = environment.baseurl+"/classRooms"

  constructor(private http: HttpClient) { }
  
  addClassRoom(classRoom: ClassRoom): Observable<ClassRoom> {
    return this.http.post(`${this.baseurl}/saveClassRoom`, classRoom)
    .pipe(
    map((response: any) => response as ClassRoom)
    );
  }

  getClassroomList(id:number): Observable<ClassRoom[]> {

    return this.http.get<ClassRoom[]>(`${this.baseurl}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as ClassRoom[])
    );
    
  }

  /*getClassroomList(): Observable<ClassRoom[]> {

    return this.http.get<ClassRoom[]>(`${this.baseurl}/getAllClassRooms`)
    .pipe(
      map((response:any) => response as ClassRoom[])
    );
    
  }*/
  deleteClassRoom(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteClassRoom/${id}`, { responseType: 'text' });
  }

  getClassRoom(id: number): Observable<ClassRoom> {
    return this.http.get(`${this.baseurl}/getClassRoom/${id}`).pipe(
      map((response: any) => response as ClassRoom)
    );
  }
  
}
