import { Component, OnInit } from '@angular/core';

import { StoreValueService } from '../../../services/sentvalue/storevalue.service';

@Component({
  selector: 'app-jobs-searchbar',
  templateUrl: './jobs-searchbar.component.html',
  styleUrls: ['./jobs-searchbar.component.css']
})
export class JobsSearchbarComponent implements OnInit {
  public searchRes: any;
  public keyword: any;

  constructor(
    private storeValueService: StoreValueService
  ) { }

  ngOnInit() {
  }

  onSearch() {
    this.storeValueService.searchToJobList.next(this.keyword);
  }
}
