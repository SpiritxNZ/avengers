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
  public keyword = "";
  public industryId = "";
  public locationId = "";
  public typeId = "";
  public sortId = "";
  public errorMessage: any;

  constructor(
    private contentService: ContentService,
    private storeValueService: StoreValueService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getDropDown();
    this.refreshPageControl();
  }

  getDropDown() {
    this.contentService.dropDownItems().subscribe(
      (res) => {
        if (res.dataCon) {
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

  // push searching results to url 
  onSearch() {
    this.storeValueService.setQueryParams('searchString', this.keyword);
    this.storeValueService.setQueryParams('disciplineNum', this.industryId);
    this.storeValueService.setQueryParams('locationNum', this.locationId);
    this.storeValueService.setQueryParams('typeNum', this.typeId);
    this.storeValueService.setQueryParams('page', 1);
    this.storeValueService.setQueryParams('order_by', this.sortId);
  }

  // For Two-way data binding, the selected item in dropdown is invariable.
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
        if(res.order_by) {
          this.sortId = res.order_by
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
