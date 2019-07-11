import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl: any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(pageSize) {
    return this.http.get<any>(this.baseUrl + "?page=" + pageSize);
  }


  searchKeyWord(keyword) {
    return this.http.get<any>(this.baseUrl + "?key_word=" + keyword);
  }
}
