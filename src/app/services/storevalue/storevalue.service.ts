import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreValueService {
  public queryParams: object = {};

  // Data from Search bar is stored here
  public searchKeyWord = new Subject<any>();
  public getListData = this.searchKeyWord.asObservable();

  // a Data in Job List is stored here
  public jobListToJob = new Subject();
  public getJob = this.jobListToJob.asObservable();


  public refreshId = new Subject();
  public getRefresh = this.refreshId.asObservable(); 

  public jobItemId = new Subject();
  public getid = this.jobItemId.asObservable();

  constructor(private router: Router ) { 
   }


  setQueryParams(paraName, paraValue) {
    if (paraValue == '') {
      delete this.queryParams[paraName];
    } else {
      this.queryParams[paraName] = paraValue;
    }
    this.router.navigate([''], { queryParams: this.queryParams });
  }
}
