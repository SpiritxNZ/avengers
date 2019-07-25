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
  public itemId: any;
  public errorMessage: any;
  public innerHeight: any
  public listingHeight: any
  public results: any;
  public onOff: boolean = false;

  public pagesIndex: any;

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService,
    private activatedRoute: ActivatedRoute,
    // public debouncer: Debouncer
  ) { }

  ngOnInit() {
    this.showData();
    this.compoHeight();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 185
  }

  // clicking to sent infomation for job.component; refreshing page by url; paginating
  showData(act?) {
    if (act) {
      if (act.id) {
        this.storeValueService.itemsList.next(act);
        this.storeValueService.setQueryParams('itemId', act.id);
        this.storeValueService.setQueryParams('page', this.currentPage);
        // this.debouncer.debounce()(() => {
        //   this.storeValueService.itemsList.next(act);
        // }, 1000)
      } else {
        this.getData(this.keyword, this.industry, this.location, this.type, act.pageIndex + 1);
        document.getElementById("jobslist").scrollTop = 0;
        this.storeValueService.setQueryParams('page', act.pageIndex + 1);
      }
      this.setParams(this.keyword, this.industry, this.location, this.type);
    } else {
      this.getAddressValue();
    }
  }

  /** 
   * public Functions area * 
  **/
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

  getData(keyword, industry, location, type, page) {
    this.contentservice.searchKeyWord(keyword, industry, location, type, page).subscribe(
      (res) => {
        if (JSON.stringify(res.data) !== "[]") {
          this.getRes(res)
          this.storeValueService.clickedItem.next(res.data);
        } else {
          this.errorMessage = "Error! Can't catch Data.";
        }
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }

  getRes(res) {
    this.jobLists = res.data;
    this.lengthTotal = res.total;
    this.currentPage = res.current_page;
    this.pagesIndex = res.current_page - 1;
    delete this.errorMessage;
  }

  setParams(keyword, industry, location, type) {
    this.storeValueService.setQueryParams('searchString', keyword);
    this.storeValueService.setQueryParams('disciplineNum', industry);
    this.storeValueService.setQueryParams('locationNum', location);
    this.storeValueService.setQueryParams('typeNum', type);
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
