import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobDetailComponent } from '../job-detail/job-detail.component';
import { ContentService } from '../../../services/http/content.service';
import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { identifierModuleUrl } from '@angular/compiler';

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
  public itemData: any;
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

  // 把itemid和页数传到地址栏
  showData(act) {
    if (act.id) {
      this.storeValueService.setQueryParams('itemId', act.id);
    } else {
      this.currentPage = act.pageIndex + 1;
      document.getElementById('leftlist').scrollTop = 0;
    }
    this.storeValueService.setQueryParams('page', this.currentPage);
  }

  // 实时监听url的变化
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

  getListData(keyword, industry, location, type, page) {
    this.contentservice.searchKeyWord(keyword, industry, location, type, page).subscribe(
      (res) => {
        this.jobLists = res.data;
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
        this.getDescData(data[i], itemid)
        break;
      } else if (i == 19 && itemid) {
        this.storeValueService.setQueryParams('page', this.currentPage);
      }
    }
  }

  // get description from serve by id 
  getDescData(data, id) {
    this.contentservice.jobdescri(id).subscribe(
      (res) => {
        data.description = res.job_description[0].description;
        this.storeValueService.itemsList.next(data);
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    );
  }

  onMiddleClick(event, id){
    if(event.button == 1) {
      window.open('/jobdetail?itemId=' + id, '_blank');
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
