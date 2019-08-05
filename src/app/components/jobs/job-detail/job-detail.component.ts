import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/http/content.service';
import { StoreValueService } from 'src/app/services/storevalue/storevalue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  public action: any;
  public description: any;
  public innerHeight: any;
  public listingHeight: any;
  public jobDetails: any;

  constructor(
    private contentservice: ContentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.compoHeight();
    this.getJobItem();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 130
  }

  // get a item from jobs-list.component clicking
  getJobItem() {
    let id = this.activatedRoute.snapshot['_routerState'].url.substring(18);
    this.contentservice.getItemDetail(id).subscribe(
      (res) => {
        this.getJobDescri(res.job[0], id);
      }
    )
  }
  
  // get the detail of a item by id
  getJobDescri(data, id) {
    this.contentservice.jobdescri(id).subscribe(
      (act) => {
        data.description = act.job_description[0].description;
        this.jobDetails = data;
      }
    )
  }
}
