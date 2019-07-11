import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(
    private storeValueService: StoreValueService,
    private contentservice: ContentService
  ) { }

  ngOnInit() {
    this.getJobItem();
  }
  getJobItem() {
    this.storeValueService.getJob.subscribe(
      (action) => {
        this.action = action;
        this.contentservice.jobdescri(action['id']).subscribe(
          (res) => {
            this.descri = res.job_description[0].description;
          }
        )
      }
    );
  }
}
