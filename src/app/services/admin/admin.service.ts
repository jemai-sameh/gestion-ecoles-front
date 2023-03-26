import { Admin } from './../../models/admin';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseurladmin :string = environment.baseurl +"/admins"

  constructor(private http: HttpClient) { }

  save(admin: Admin): Observable<Admin> {
    return this.http.post(`${this.baseurladmin}/save`, admin)
    .pipe(
      map((response:any) => response as Admin)
    );
  }
 
  findById(id: number): Observable<Admin> {
    return this.http.get(`${this.baseurladmin}/findById/${id}`).pipe(
      map((response:any) => response as Admin)
    );
  }

  findAllAdmin(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseurladmin}/findAll`)
    .pipe(
      map((response:any) => response as Admin[])
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseurladmin}/delete/${id}`,{ responseType: 'text' });
  }

  EnabledOrDisabledStatus(id:number,status:number): Observable<any> {
    return this.http.post(`${this.baseurladmin}/EnabledOrDisabledStatus/${id}/${status}`,{});
  }
  
  findAllAdminBySchool(idSchool:number): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseurladmin}/findAllBySchool/${idSchool}`)
    .pipe(
      map((response:any) => response as Admin[])
    );
  }
}
