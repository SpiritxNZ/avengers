import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreValueService {
  // Data from Search bar is stored here
  public searchKeyWord = new Subject<any>();
  public getListData = this.searchKeyWord.asObservable();

  // a Data in Job List is stored here
  public jobListToJob = new Subject();
  public getJob = this.jobListToJob.asObservable();

  constructor() {  }

}
