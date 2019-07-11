import { Component, OnInit } from '@angular/core';

import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-searchbar',
  templateUrl: './jobs-searchbar.component.html',
  styleUrls: ['./jobs-searchbar.component.css']
})
export class JobsSearchbarComponent implements OnInit {
  public searchRes: any;
  public keyword = "";
  public industryId = "";
  public locationId = "";
  public typeId = "";
  public queryParams: object = {};

  constructor(
    private storeValueService: StoreValueService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // get searching results by limited conditions, and 
  onSearch(event) {
    if (event !== null && !(event.type == "keydown" && event.key == "Enter")) {
      return;
    } else {
      let searchBy = 'key_word';
      let searchString = this.keyword;
      let disciplineBy = 'job_discipline'
      let disciplineId = this.industryId;
      let locationBy = 'job_location';
      let locationId = this.locationId;
      let typeBy = 'job_type';
      let typeId = this.typeId;
      this.setQueryParams('searchBy', searchBy);
      this.setQueryParams('searchString', searchString);
      this.setQueryParams('disciplineBy', disciplineBy);
      this.setQueryParams('disciplineNum', disciplineId);
      this.setQueryParams('locationBy', locationBy);
      this.setQueryParams('locationNum', locationId);
      this.setQueryParams('typeBy', typeBy);
      this.setQueryParams('typeNum', typeId);
    }
    let obj = {
      keyword: this.keyword,
      industry: this.industryId,
      location: this.locationId,
      type: this.typeId
    };
    // console.log(obj)
    this.storeValueService.searchKeyWord.next(obj);
  }

  setQueryParams(paraName, paraValue) {
    if (paraValue == '') {
      delete this.queryParams[paraName];
      delete this.queryParams['searchBy'];
      delete this.queryParams['disciplineBy'];
      delete this.queryParams['locationBy'];
      delete this.queryParams['typeBy'];
    } else {
      this.queryParams[paraName] = paraValue;
    }
    this.router.navigate([''], { queryParams: this.queryParams });
  }
}
