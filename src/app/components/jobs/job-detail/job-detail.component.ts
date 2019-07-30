import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/http/content.service';

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

  constructor(private contentservice: ContentService) { }

  ngOnInit() {
    this.compoHeight();   
    this.getDescData();
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

}
