import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from '../../models/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrlSubject :string = environment.baseurl +"/subjects"

  constructor(private http: HttpClient) { }

  saveSubject(subject: Subject): Observable<Subject> {
    return this.http.post(`${this.baseUrlSubject}/saveSubject`, subject)
    .pipe(
      map((response:any) => response as Subject)
    );
  }
 /* getSubjectList(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrlSubject}/getAllSubjects`)
    .pipe(
      map((response:any) => response as Subject[])
    );
    
  }
*/
  getSubjectList(id:number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrlSubject}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as Subject[])
    );
    
  }

  deleteSubject(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrlSubject}/deleteSubject/${id}`,{ responseType: 'text' });
  }
  getSubjectById(id: number): Observable<Subject> {
    return this.http.get(`${this.baseUrlSubject}/getSubject/${id}`).pipe(
      map((response:any) => response as Subject)
    );
  }
  getSubjectByName(name: string): Observable<Subject> {
    return this.http.get(`${this.baseUrlSubject}/getSubjectByName/${name}`).pipe(
      map((response:any) => response as Subject)
    );
  }
  
  findAllByClassesIsNull(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrlSubject}/findAllByClassesIsNull`).pipe(
      map((response:any) => response as Subject[])
    );
  }
}
