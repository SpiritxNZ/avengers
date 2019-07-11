import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-panel',
  templateUrl: './jobs-panel.component.html',
  styleUrls: ['./jobs-panel.component.css']
})
export class JobsPanelComponent implements OnInit {
  public screenwidth: boolean = false;

  constructor() { }  

  ngOnInit() {
    this.windowonload();
  }

  windowonload() {
    if(screen.width<768){
      this.screenwidth = true;
    }
  }
}
