import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Section } from '../../models/section';
import { Observable } from 'rxjs';
import { LabelValue } from 'src/app/models/labelValue';
//import { LavelValue } from 'src/app/models/labelValue';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  baseUrlSection :string = environment.baseurl+"/sections"

  constructor(private http: HttpClient) { }

  saveSection(section: Section): Observable<Section> {
    return this.http.post(`${this.baseUrlSection}/saveSection`, section)
    .pipe(
      map((response:any) => response as Section)
    );
  }
  /*getSectionList(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.baseUrlSection}/getAllSections`)
    .pipe(
      map((response:any) => response as Section[])
    );
    
  }*/

  getAllSectionList(id:number): Observable<LabelValue[]> {
    return this.http.get<LabelValue[]>(`${this.baseUrlSection}/findAllSectionBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as LabelValue[])
    );
    
  }

  getSectionList(id:number): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.baseUrlSection}/findAllBySchool/`+((id===null)?0:id))
    .pipe(
      map((response:any) => response as Section[])
    );
    
  }


  deleteSection(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrlSection}/deleteSection/${id}`,{ responseType: 'text' });
  }
  getSectionById(id: number): Observable<Section> {
    return this.http.get(`${this.baseUrlSection}/getSection/${id}`).pipe(
      map((response:any) => response as Section)
    );
  }
  getSectionByCode(code: string): Observable<Section> {
    return this.http.get(`${this.baseUrlSection}/getSectionByCode/${code}`).pipe(
      map((response:any) => response as Section)
    );
  }
  /*getSectionLabelValueList():Observable<LabelValue[]>
  {
    const url = this.baseUrlSection+`/getLevelList`;
    return this.http.get(url).pipe(
      map((response:any) => response as LabelValue[])
    );
  }*/

  getSections(): Observable<LabelValue[]> {
    return this.http.get<LabelValue[]>(`${this.baseUrlSection}/getSections`)
    .pipe(
      map((response:any) => response as LabelValue[])
    );
    
  }
}
