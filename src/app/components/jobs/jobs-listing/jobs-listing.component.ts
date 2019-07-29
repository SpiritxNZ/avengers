import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentService } from '../../../services/http/content.service';
import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { Debouncer } from '../../../classes/debouncer';

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
  public debouncer: Debouncer;
  public itemData: any;
  public arr = [];

  public pagesIndex: any;

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.getAddressValue();
    this.compoHeight();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 185
  }

  // clicking to sent infomation for job.component; refreshing page by url; paginating
  showData(act) {
    if (act.id) {
      this.storeValueService.setQueryParams('itemId', act.id);
      this.itemData = act;
      this.getDescData(act.id);
    } else {
      this.currentPage = act.pageIndex + 1;
    }
    this.storeValueService.setQueryParams('page', this.currentPage);
  }

  // 这也是从后端拿数据
  getDescData(id) {
    this.contentservice.jobdescri(id).subscribe(
      (res) => {
        this.itemData.description = res.job_description[0].description;
        this.storeValueService.itemsList.next(this.itemData);
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    );
  }

  /** 
   * public Functions area * 
  **/
  // 这个只是左边list展示的Data
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
        this.getListData(this.keyword, this.industry, this.location, this.type, this.currentPage);
      }
    )
  }

  // 从后端拿数据给前端展示
  getListData(keyword, industry, location, type, page) {
    this.contentservice.searchKeyWord(keyword, industry, location, type, page).subscribe(
      (res) => {
        this.jobLists = res.data; //这是全部的list
        this.lengthTotal = res.total;
        this.currentPage = res.current_page;
        this.pagesIndex = res.current_page - 1;
        this.processing(this.jobLists, this.itemId);
        delete this.errorMessage;
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    )
  }

  processing(data, itemid) {
    for (var i = 0; i < data['length']; i++) {
      if (data[i].id == itemid) {
        this.itemData = data[i]
        this.getDescData(itemid)
        break;
      }
    }
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
