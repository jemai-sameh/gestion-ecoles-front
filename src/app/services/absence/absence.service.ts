import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/models/absence';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  baseurlabsence :string = environment.baseurl +"/absences"

  constructor(private http: HttpClient) { }

  saveAbsence(absence: Absence): Observable<Absence> {
    return this.http.post(`${this.baseurlabsence}/addOrUpdate`, absence)
    .pipe(
      map((response:any) => response as Absence)
    );
  }
  /*getAbsenceList(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseurlabsence}/listeAbsence`)
    .pipe(
      map((response:any) => response as Absence[])
    );
    
  }*/
  getAbsenceList(id:number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseurlabsence}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as Absence[])
    );
    
  }

  getAllByStudent(id:number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseurlabsence}/findAllByStudent/`+id)
    .pipe(
      map((response:any) => response as Absence[])
    );
    
  }
  deleteAbsence(id: any): Observable<any> {
    return this.http.delete(`${this.baseurlabsence}/deleteAbsence/${id}`,{ responseType: 'text' });
  }
  getAbsenceById(id: number): Observable<Absence> {
    return this.http.get(`${this.baseurlabsence}/getbyid/${id}`).pipe(
      map((response:any) => response as Absence)
    );
  }
}
