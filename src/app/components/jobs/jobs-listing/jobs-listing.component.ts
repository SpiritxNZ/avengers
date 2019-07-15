import { Component, OnInit, Directive } from '@angular/core';

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
  public keyword: any;
  public industry: any;
  public location: any;
  public type: any;

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService
  ) { }

  ngOnInit() {
    this.getMessage();
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
            this.jobLists = act.data;
            this.lengthTotal = act.total;
            // console.log(this.jobLists);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    )
  }
  //sent info to a service
  sendMessage(act) {
    this.storeValueService.jobListToJob.next(act);
  }

  // when click previous or next page, call the following function.
  getPage(event) {
    this.contentservice.searchKeyWord(this.keyword, this.industry, this.location, this.type, event.pageIndex + 1).subscribe(
      (res) => {
        this.jobLists = res.data;
        // everytime paginating the content goes back top
        document.getElementById("jobslist").scrollTop = 0;
      }
    )
  }
}
