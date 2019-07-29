import { Component, OnInit } from '@angular/core';
import { StoreValueService } from '../../../services/storevalue/storevalue.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  public action: any;
  public innerHeight: any;
  public listingHeight: any;

  constructor(
    private storeValueService: StoreValueService
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
    this.storeValueService.getItemsList.subscribe(
      (item) => {
        this.action = item;
        document.getElementById('rightlist').scrollTop = 0;
      }
    );
  }
}
