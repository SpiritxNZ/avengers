import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentService } from '../../../services/http/content.service';
import { StoreValueService } from '../../../services/storevalue/storevalue.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})

@Directive({
  selector: '[onScroll]',
})
export class JobsListingComponent implements OnInit {
  public jobLists: any;
  public resultsLength = 0;
  public lengthTotal: any;
  public keyword = '';
  public industry = '';
  public location = '';
  public type = '';
  public currentPage = 1;
  public errorMessage: any;
  public innerHeight: any
  public listingHeight: any
  public itemId: any;
  public results: any;

  public pagesIndex: any;

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {    
    this.showData();
    this.compoHeight();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 185
  }

  // Get results from Search bar or refresh the page
  showData() {
    this.getAddressValue();
    this.setParams(this.keyword, this.industry, this.location, this.type);
    this.storeValueService.setQueryParams('page', this.currentPage);
    this.storeValueService.setQueryParams('itemId', this.itemId);
  }

  // Get results from Pagination
  getPaging(event) {
    this.getData(this.keyword, this.industry, this.location, this.type, event.pageIndex + 1);
    // everytime paginating the content goes back top
    document.getElementById("jobslist").scrollTop = 0;
    this.setParams(this.keyword, this.industry, this.location, this.type);
    this.storeValueService.setQueryParams('page', event.pageIndex + 1)
  }

  //sent info to a service
  sendMessage(act) {
    console.log(act)
    this.storeValueService.jobListToJob.next(act);
    this.setParams(this.keyword, this.industry, this.location, this.type);
    this.storeValueService.setQueryParams('page', this.currentPage);
    this.storeValueService.setQueryParams('itemId', act.id);
  }

  /** 
   * public Functions area * 
  **/

  getData(keyword, industry, location, type, page) {
    this.contentservice.searchKeyWord(keyword, industry, location, type, page).subscribe(
      (res) => {
        if (JSON.stringify(res.data) !== "[]") {
          this.getRes(res)
        }
      },
      (err) => {
        this.backendErrorHandler(err);
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

  getRes(res) {
    this.jobLists = res.data;
    this.lengthTotal = res.total;
    this.currentPage = res.current_page;
    this.pagesIndex = res.current_page - 1;
    if (this.itemId) {
      this.storeValueService.jobItemId.next(this.itemId)
      this.storeValueService.refreshId.next(this.jobLists)
    }
    delete this.errorMessage;
  }
  
  // get value from url
  getAddressValue() {
    this.activatedRoute.queryParams.subscribe(
      (res) => {
        if (res.searchString) {
          this.keyword = res.searchString;
        }
        if (res.disciplineNum) {
          this.industry = res.disciplineNum;
        }
        if (res.locationNum) {
          this.location = res.locationNum;
        }
        if (res.typeNum) {
          this.type = res.typeNum;
        }
        if (res.page) {
          this.currentPage = res.page;
        }
        if (res.itemId) {
          this.itemId = res.itemId;
        }
        this.getData(this.keyword, this.industry, this.location, this.type, this.currentPage);
      }
    )
  }

  setParams(keyword, industry, location, type) {
    this.storeValueService.setQueryParams('searchString', keyword);
    this.storeValueService.setQueryParams('disciplineNum', industry);
    this.storeValueService.setQueryParams('locationNum', location);
    this.storeValueService.setQueryParams('typeNum', type);
  }
}
