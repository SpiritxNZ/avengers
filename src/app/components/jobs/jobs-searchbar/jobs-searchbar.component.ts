import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/http/content.service'
import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-searchbar',
  templateUrl: './jobs-searchbar.component.html',
  styleUrls: ['./jobs-searchbar.component.css']
})
export class JobsSearchbarComponent implements OnInit {
  public jobDis: any;
  public jobLoc: any;
  public jobType: any;
  public searchRes: any;
  public keyword = "";
  public industryId = "";
  public locationId = "";
  public typeId = "";
  public queryParams: object = {};

  constructor(
    private contentService: ContentService,
    private storeValueService: StoreValueService,
    private router: Router    
  ) { }

  ngOnInit() {
    this.getDropDown();
  }

  getDropDown(){
    this.contentService.dropDownItems().subscribe(
      (res) => {
        this.jobDis = res.dataCon.job_discipline;
        this.jobLoc = res.dataCon.job_location;
        this.jobType = res.dataCon.job_type;
        console.log(res.dataCon);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  // get searching results by limited conditions, and 
  onSearch(event) {
    if (event !== null && !(event.type == "keydown" && event.key == "Enter")) {
      return;
    } else {
      let searchBy = 'key_word';
      let searchString = this.keyword;
      let disciplineBy = 'job_discipline';
      let disciplineId = this.industryId;
      let locationBy = 'job_location';
      let locationId = this.locationId;
      let typeBy = 'job_type';
      let typeId = this.typeId;

      // let searchBy: any;
      // let searchString: any;
      // let disciplineBy: any;
      // let disciplineId: any;
      // let locationBy: any;
      // let locationId: any;
      // let typeBy: any;
      // let typeId: any;

      // (initValue == undefined) ?
      //   { searchString, searchBy, disciplineId, disciplineBy, locationId, locationBy, typeId, typeBy } =
      //   {
      //     searchBy: 'key_word',
      //     searchString: this.keyword,
      //     disciplineBy: 'job_discipline',
      //     disciplineId: this.industryId,
      //     locationBy: 'job_location',
      //     locationId: this.locationId,
      //     typeBy: 'job_type',
      //     typeId: this.typeId
      //   } :
      //   { searchString, searchBy, disciplineId, disciplineBy, locationId, locationBy, typeId, typeBy } = initValue;


      this.setQueryParams('searchBy', searchBy);
      this.setQueryParams('searchString', searchString);
      this.setQueryParams('disciplineBy', disciplineBy);
      this.setQueryParams('disciplineNum', disciplineId);
      this.setQueryParams('locationBy', locationBy);
      this.setQueryParams('locationNum', locationId);
      this.setQueryParams('typeBy', typeBy);
      this.setQueryParams('typeNum', typeId);
      this.setQueryParams('page', 1);
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
