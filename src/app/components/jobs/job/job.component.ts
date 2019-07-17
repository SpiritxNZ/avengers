import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/http/content.service'
import { StoreValueService } from '../../../services/storevalue/storevalue.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  public action: any;
  public descri: any;
  public errorMessage: any;
  public innerHeight: any
  public listingHeight: any

  constructor(
    private storeValueService: StoreValueService,
    private contentservice: ContentService
  ) { }

  ngOnInit() {
    this.getJobItem();
    this.compoHeight();
    this.refreshPageControl();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 313
  }

  getJobItem() {
    this.storeValueService.getJob.subscribe(
      (action) => {
        this.action = action;
        this.contentservice.jobdescri(action['id']).subscribe(
          (res) => {
            this.descri = res.job_description[0].description;
            // when everytime refreshing this component, go to top
            document.getElementById("jobcontent").scrollTop = 0;
          }
        )
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    );
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

  refreshPageControl() {
    let idArr = [];
    this.storeValueService.getid.subscribe(
      (res) => {
        this.storeValueService.getRefresh.subscribe(
          (act) => {
            for (var i = 0; i <= act['length']; i++) {
              if (act[i].id == res) {
                this.action = act[i];
                this.contentservice.jobdescri(res).subscribe(
                  (res) => {
                    this.descri = res.job_description[0].description;
                    // when everytime refreshing this component, go to top
                    document.getElementById("jobcontent").scrollTop = 0;
                  }
                )
                break;
              }
              // idArr[i] = act[i].id;
            }
          }
        )
      }
    )
  }
}
