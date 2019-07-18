import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreValueService {
  public queryParams: object = {};
  public errorMessage: any;

  // a Data in Job List is stored here
  public jobListToJob = new Subject();
  public getJob = this.jobListToJob.asObservable();

  // For job.component calling by value    
  public refreshId = new Subject();
  public getRefresh = this.refreshId.asObservable();
  public jobItemId = new Subject();
  public getid = this.jobItemId.asObservable();

  constructor(
    private router: Router,
  ) {}



  setQueryParams(paraName, paraValue) {
    if (paraValue) {
      this.queryParams[paraName] = paraValue;      
    } else {
      delete this.queryParams[paraName];
    }
    this.router.navigate([''], { queryParams: this.queryParams });
  }
}
