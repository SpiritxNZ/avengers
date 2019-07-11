import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { StoreValueService } from '../../../services/sentvalue/storevalue.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  public action: any;
  public sub: Subscription;

  constructor(
    private storeValueService: StoreValueService
  ) { }

  ngOnInit() {
    this.getJobItem();
  }
  getJobItem() {
    this.storeValueService.getJob.subscribe(
      (action) => {
        this.action = action;
      }
    );
  }
}
