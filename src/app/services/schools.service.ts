
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { School } from '../models/School';


@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  baseurl: string = environment.baseurl +"/schools"

  constructor(public http: HttpClient) { }

  ajouterSchool(school: School): Observable<School> {
    return this.http.post(`${this.baseurl}/saveSchool`, school)
      .pipe(
        map((response: any) => response as School)
      );
  }
  getSchoolList(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseurl}/getAllSchools`)
      .pipe(
        map((response: any) => response as School[])
      );

  }
  
  deleteSchool(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteSchool/${id}`,{ responseType: 'text' });
  }
  getSchool(id: number): Observable<School> {
    return this.http.get(`${this.baseurl}/getSchool/${id}`).pipe(
      map((response: any) => response as School)
    );
  }
  getSchoolByName(name: string): Observable<School> {
    return this.http.get(`${this.baseurl}/getSchoolByName/${name}`).pipe(
      map((response: any) => response as School)
    );

  }

  findAllByAdminIsNull(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseurl}/findAllByAdminIsNull`).pipe(
      map((response:any) => response as School[])
    );
  }
}
