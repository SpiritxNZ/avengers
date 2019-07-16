import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-jobs-panel',
  templateUrl: './jobs-panel.component.html',
  styleUrls: ['./jobs-panel.component.css']
})
export class JobsPanelComponent implements OnInit {
  

  public bodyHeight: any;
  public viewHeight: number;

  constructor(
    private elementView: ElementRef
  ) { }  

  ngOnInit() {
    this.windowonload();
  }

  windowonload() {
    this.bodyHeight = window.innerHeight;
    // this.viewHeight = this.elementView.nativeElement.offsetHeight;
    // console.log(this.viewHeight);
  }
}
