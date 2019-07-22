import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/http/content.service'
import { StoreValueService } from '../../../services/storevalue/storevalue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  public action: any;
  public descri: any;
  public errorMessage: any;
  public innerHeight: any;
  public listingHeight: any;
  public itemId: any;

  constructor(
    private storeValueService: StoreValueService,
    private contentservice: ContentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.compoHeight();
    this.refreshPage();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 364
  }

  // refreshing the page or a item from jobs-list.component clicking
  refreshPage() {
    this.activatedRoute.queryParams.subscribe(
      (res) => {
        if (res.itemId) {
          // For refreshing
          this.getJobItems(res.itemId)
        } else {
          // For from clicking
          this.getJobItem();
        }
      }
    )
  }

  // get a item from jobs-list.component clicking
  getJobItem() {
    this.storeValueService.getItemsList.subscribe(
      (item) => {
        this.action = item;
        this.getItemDescri(item['id']);
      }
    );
  }

  // refreshing page: if there is id in URL, match an united item of the id from sent items list.
  getJobItems(itemid) {
    this.storeValueService.getClickedItem.subscribe(
      (items) => {
        for (var i = 0; i <= items['length']; i++) {
          if (items[i].id == itemid) {
            this.action = items[i];
            this.getItemDescri(items[i].id);
            break;
          }
        }
        delete this.errorMessage;
      }
    )
  }

  // find descriptioin of the id out from api
  getItemDescri(id) {
    this.contentservice.jobdescri(id).subscribe(
      (res) => {
        this.descri = res.job_description[0].description;
        // when everytime refreshing this component, go to top
        document.getElementById("jobcontent").scrollTop = 0;
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
}
