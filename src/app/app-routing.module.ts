import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsPanelComponent } from '../app/components/jobs/jobs-panel/jobs-panel.component';
import { JobDetailComponent } from '../app/components/jobs/job-detail/job-detail.component';
import { TestComponent } from '../app/components/test/test.component';

const routes: Routes = [
  { path: '', component: JobsPanelComponent },
  { path: 'jobdetail', component: JobDetailComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
