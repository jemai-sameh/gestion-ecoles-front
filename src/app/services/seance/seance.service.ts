import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Seance } from 'src/app/models/seance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  baseurlSeance :string = environment.baseurl +"/seances"

  constructor(private http: HttpClient) { }

  saveSeance(seance: Seance): Observable<Seance> {
    return this.http.post(`${this.baseurlSeance}/addOrUpdate`, seance)
    .pipe(
      map((response:any) => response as Seance)
    );
  }

  /*getSeanceList(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.baseurlSeance}/listeSeance`)
    .pipe(
      map((response:any) => response as Seance[])
    );
    
  }*/
  getSeanceList(id:number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.baseurlSeance}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as Seance[])
    );
    
  }
  getSeanceListByClass(id:number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.baseurlSeance}/findAllByClass/`+id)
    .pipe(
      map((response:any) => response as Seance[])
    );
    
  }
  deleteSeance(id: any): Observable<any> {
    return this.http.delete(`${this.baseurlSeance}/deleteSeance/${id}`,{ responseType: 'text' });
  }
  findSeanceById(id: number): Observable<Seance> {
    return this.http.get(`${this.baseurlSeance}/getbyid/${id}`).pipe(
      map((response:any) => response as Seance)
    );
  }

}
