import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/http/content.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  datas:any
  innerHeight:any
  listingHeight:any
  constructor(
    private contentservice: ContentService,
  ) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    console.log(this.innerHeight)
    this.listingHeight = this.innerHeight - 200

    this.callDB()
  }

  callDB(){
    let keyword = ''
    let jobdiscipline = ''
    let joblocation = ''
    let jobtype = 1
    let pageSize = 1
    this.contentservice.searchKeyWord(keyword, jobdiscipline, joblocation, jobtype, pageSize).subscribe(
      (res)=>{console.log(res), this.datas = res.data },
      (err)=>[console.log(err)]
    )


  }
}
