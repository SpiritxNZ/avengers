import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/http/content.service';
import { StoreValueService } from 'src/app/services/storevalue/storevalue.service';

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

  constructor(
    private contentservice: ContentService,
    private storeValueService: StoreValueService
  ) { }

  ngOnInit() {
    this.compoHeight();   
    // this.getDescData();
    this.getJobItem();
  }

  compoHeight() {
    this.innerHeight = window.innerHeight;
    this.listingHeight = this.innerHeight - 130
  }

  getDescData(){
    this.contentservice.jobdescri(918).subscribe(
      (res) => {
        this.description = res.job_description[0].description;
      }
    )
  }

  // get a item from jobs-list.component clicking
  getJobItem() {
    this.storeValueService.getItemsList.subscribe(
      (item) => {
        console.log(item)
      }
    );
  }

}
