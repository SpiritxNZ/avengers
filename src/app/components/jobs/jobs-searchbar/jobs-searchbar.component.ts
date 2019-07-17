import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/http/content.service'
import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDropDown();
    this.refreshPageControl();
  }

  getDropDown() {
    this.contentService.dropDownItems().subscribe(
      (res) => {
        this.jobDis = res.dataCon.job_discipline;
        this.jobLoc = res.dataCon.job_location;
        this.jobType = res.dataCon.job_type;
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
    }
    let searchString = this.keyword;
    let disciplineId = this.industryId;
    let locationId = this.locationId;
    let typeId = this.typeId;
    this.storeValueService.setQueryParams('searchString', searchString);
    this.storeValueService.setQueryParams('disciplineNum', disciplineId);
    this.storeValueService.setQueryParams('locationNum', locationId);
    this.storeValueService.setQueryParams('typeNum', typeId);

    let obj = {
      keyword: this.keyword,
      industry: this.industryId,
      location: this.locationId,
      type: this.typeId
    };
    // console.log(obj)
    this.storeValueService.searchKeyWord.next(obj);
  }

  refreshPageControl() {
    this.activatedRoute.queryParams.subscribe(
      (res) => {
        if(res.searchString!==undefined){
          this.keyword = res.searchString;
        }
        if(res.disciplineNum!==undefined){
          this.industryId = res.disciplineNum;
        }
        if(res.locationNum!==undefined){
          this.locationId = res.locationNum;
        }
        if(res.typeNum!==undefined){
          this.typeId = res.typeNum;
        }      
      }
    )
  }
}
