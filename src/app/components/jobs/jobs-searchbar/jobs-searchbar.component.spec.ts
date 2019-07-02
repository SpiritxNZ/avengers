import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSearchbarComponent } from './jobs-searchbar.component';

describe('JobsSearchbarComponent', () => {
  let component: JobsSearchbarComponent;
  let fixture: ComponentFixture<JobsSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsSearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
