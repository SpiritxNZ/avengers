import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl: any = environment.baseUrl;

  constructor(private http: HttpClient) { }  

  searchKeyWord(keyword, jobdiscipline, joblocation, jobtype, pageSize) {
    return this.http.get<any>(this.baseUrl + "/findjobs" + "?key_word=" + keyword + "&job_discipline=" + jobdiscipline + "&job_location=" + joblocation + "&job_type=" + jobtype + "&page=" + pageSize)
  }

  jobdescri(id){
    return this.http.get<any>(this.baseUrl + "/jobdetail?id=" + id);
  }
}
