import { Component, OnInit, SimpleChanges } from '@angular/core';

import { ContentService } from '../../../services/http/content.service';
import { StoreValueService } from '../../../services/sentvalue/storevalue.service';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})
export class JobsListingComponent implements OnInit {
  public jobLists: any;
  public resultsLength = 0;
  public lengthTotal: any;
  public num = 1;

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
        this.contentservice.searchKeyWord(res).subscribe(
          (act) => {
            this.jobLists = act.data;
            this.lengthTotal = act.total;
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
    this.contentservice.getData(event.pageIndex + 1).subscribe(
      (res) => {
        this.jobLists = res.data;
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
