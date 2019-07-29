import { Directive, HostListener, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceclick]'
})
export class DebounceclickDirective implements OnInit{
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject<any>();

  constructor() { }
  
  ngOnInit(){
    this.clicks.pipe(debounceTime(1000)).subscribe(e=> this.debounceClick.emit(e))
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event)
  }
}
