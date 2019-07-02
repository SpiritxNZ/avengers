import { Routes, RouterModule } from '@angular/router';

import { JobsPanelComponent } from '../app/components/jobs/jobs-panel/jobs-panel.component';
import { JobComponent } from '../app/components/jobs/job/job.component';

const routes: Routes = [
  {  path: '', component: JobsPanelComponent },
  { path: 'job', component: JobComponent},
  { path: '**', redirectTo: 'home' }
];
export const routing = RouterModule.forRoot(routes);
