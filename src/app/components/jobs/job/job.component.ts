import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  public errorMessage: any;
  public innerHeight: any;
  public listingHeight: any;
  public itemId: any;
  public arr = [];
  private subscription: Subscription;

  constructor(
    private storeValueService: StoreValueService,
    private contentservice: ContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.compoHeight();
    // this.refreshPage();    
    this.getJobItem();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 130
  }
  
  // get a item from jobs-list.component clicking
  getJobItem() {
    this.storeValueService.getItemsList.subscribe(
      (item) => {
        console.log(item)
        this.action = item;
      }
    );
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
