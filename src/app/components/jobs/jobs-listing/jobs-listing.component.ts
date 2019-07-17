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

  public pagesIndex: any;

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMessage();
    this.refreshPageControl();
    this.compoHeight();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 185
  }

  // Get searching results from Search Bar
  getMessage() {
    this.storeValueService.getListData.subscribe(
      (res) => {
        this.keyword = res.keyword;
        this.industry = res.industry;
        this.location = res.location;
        this.type = res.type;
        this.contentservice.searchKeyWord(res.keyword, res.industry, res.location, res.type, 1).subscribe(
          (act) => {
            if (JSON.stringify(act.data) !== "[]" && act !== undefined) {
              this.jobLists = act.data;
              this.lengthTotal = act.total;
              this.storeValueService.setQueryParams('page', act.current_page);
              delete this.errorMessage;
            } else {
              this.errorMessage = "Error! Can't catch Data.123";
            }
          }
        );
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }
  //sent info to a service
  sendMessage(act) {
    this.storeValueService.jobListToJob.next(act);
    this.storeValueService.setQueryParams('searchString', this.keyword);
    this.storeValueService.setQueryParams('disciplineNum', this.industry);
    this.storeValueService.setQueryParams('locationNum', this.location);
    this.storeValueService.setQueryParams('typeNum', this.type);
    this.storeValueService.setQueryParams('page', this.currentPage);
    this.storeValueService.setQueryParams('itemId', act.id);
  }

  // when click previous or next page, call the following function.
  getPage(event) {
    this.contentservice.searchKeyWord(this.keyword, this.industry, this.location, this.type, event.pageIndex + 1).subscribe(
      (res) => {
        this.jobLists = res.data;
        // everytime paginating the content goes back top
        document.getElementById("jobslist").scrollTop = 0;
        // this.currentPage = event.pageIndex + 1;
        this.storeValueService.setQueryParams('searchString', this.keyword);
        this.storeValueService.setQueryParams('disciplineNum', this.industry);
        this.storeValueService.setQueryParams('locationNum', this.location);
        this.storeValueService.setQueryParams('typeNum', this.type);
        this.storeValueService.setQueryParams('page', event.pageIndex + 1)
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }

  refreshPageControl() {
    this.activatedRoute.queryParams.subscribe(
      (res) => {
        if (res.searchString !== undefined) {
          this.keyword = res.searchString;
        }
        if (res.disciplineNum !== undefined) {
          this.industry = res.disciplineNum;
        }
        if (res.locationNum !== undefined) {
          this.location = res.locationNum;
        }
        if (res.typeNum !== undefined) {
          this.type = res.typeNum;
        }
        if (res.page !== undefined) {
          this.currentPage = res.page;
        }        
        // this.currentPage = res.page;
        this.contentservice.searchKeyWord(this.keyword, this.industry, this.location, this.type, this.currentPage).subscribe(
          (act) => {
            if (JSON.stringify(act.data) !== "[]" && act !== undefined) {
              this.jobLists = act.data;
              this.lengthTotal = act.total;
              this.pagesIndex = act.current_page - 1;
              if(res.itemId !== undefined) {
                this.storeValueService.jobItemId.next(res.itemId)
                this.storeValueService.refreshId.next(act.data)
              }
            } else if (!this.errorMessage) {
              this.errorMessage = "Error! Can't catch Data.321"
            }
          }
        );
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }
  backendErrorHandler(err) {
    console.warn(err)
    if (err.error.ErrorMessage != null) {
      this.errorMessage = err.error.ErrorMessage;
    }
    else {
      this.errorMessage = "Error! Can't catch Data."
    }
  }
}
