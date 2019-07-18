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
  public errorMessage: any;

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
        let asd = {}
        if (JSON.stringify(res.dataCon) !== "{}" && res.dataCon !== undefined) {
          this.jobDis = res.dataCon.job_discipline;
          this.jobLoc = res.dataCon.job_location;
          this.jobType = res.dataCon.job_type;
          delete this.errorMessage;
        } else {
          this.errorMessage = "Error! Can't catch Data."
        }
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }

  // get searching results by limited conditions 
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
    this.storeValueService.setQueryParams('page', 1);

    let obj = {
      keyword: this.keyword,
      industry: this.industryId,
      location: this.locationId,
      type: this.typeId,
      page: 1
    };
    // console.log(obj)
    // this.storeValueService.searchKeyWord.next(obj);
  }

  // For Two-way data binding
  refreshPageControl() {
    this.activatedRoute.queryParams.subscribe(
      (res) => {
        if (res.searchString) {
          this.keyword = res.searchString;
        }
        if (res.disciplineNum) {
          this.industryId = res.disciplineNum;
        }
        if (res.locationNum) {
          this.locationId = res.locationNum;
        }
        if (res.typeNum) {
          this.typeId = res.typeNum;
        }
      }
    )
  }

  backendErrorHandler(err) {
    console.warn(err)
    if (err.error.message != null) {
      this.errorMessage = err.error.message;
    }
    else {
      this.errorMessage = "Error! Can't catch Data."
    }
  }
}
