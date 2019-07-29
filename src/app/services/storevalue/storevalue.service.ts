import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreValueService {
  public queryParams: object = {};
  public errorMessage: any;

  // sent a items list to job.component
  public itemsList = new Subject;
  public getItemsList = this.itemsList.asObservable();

  // sent a item to job.component.
  public clickedItem = new Subject;
  public getClickedItem = this.clickedItem.asObservable();

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
