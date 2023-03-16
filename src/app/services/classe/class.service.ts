import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  Classe } from 'src/app/models/classe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  baseurl :string = environment.baseurl+"/classes";

  constructor(private http: HttpClient) { }

  save(classEntity: Classe): Observable<Classe> {
    return this.http.post(`${this.baseurl}/save`, classEntity)
    .pipe(
      map((response:any) => response as Classe)
    );
  }
  findAll(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseurl}/findAll`)
    .pipe(
      map((response:any) => response as Classe[])
    );
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteById/${id}`,{ responseType: 'text' });
  }
  findById(id: number): Observable<Classe> {
    return this.http.get(`${this.baseurl}/findById/${id}`).pipe(
      map((response:any) => response as Classe)
    );
  }
  findClassByLevelClass(level: string): Observable<Classe> {
    return this.http.get(`${this.baseurl}/findClassByLevelClass/${level}`).pipe(
      map((response:any) => response as Classe)
    );
  }
  findClassByLabelClass(label: string): Observable<Classe> {
    return this.http.get(`${this.baseurl}/findClassByLabelClass/${label}`).pipe(
      map((response:any) => response as Classe)
    );
  }
  findAllByLevel(levelId: any): Observable<Classe> {
    return this.http.get(`${this.baseurl}/findAllByLevel/${levelId}`).pipe(
      map((response:any) => response as Classe)
    );
  }
  addSubjectToClasse(idSubject:number ,idClass: number): Observable<Classe> {
    return this.http.post(`${this.baseurl}/addSubjectToClasse/${idSubject}/${idClass}`,{}).pipe(
      map((response:any) => response as Classe)
    );
  }
}