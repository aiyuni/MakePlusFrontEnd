import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectViewComponent } from './lowLevel-view/project-view.component';
import { HighlevelViewComponent } from './highlevel-view/highlevel-view.component';
import { WorkloadViewComponent } from './midLevel-view/workload-view.component';
import { ProjectEditComponent } from './lowLevel-view/project-edit/project-edit.component';
import { VacationEntryComponent } from './VacationEntry/vacation-entry/vacation-entry.component';
import { SystemAdminComponent } from './SystemAdmin/system-admin/system-admin.component';
import { NewProjectComponent } from './new-project/new-project.component';



const routes: Routes = [
  {path: '',component: HighlevelViewComponent},
  {path: 'workloadSummery',component: WorkloadViewComponent},
  {path: 'project/:id',component: ProjectViewComponent},
  {path: 'project/edit/:id', component: ProjectEditComponent},
  {path: 'vacationEntry', component: VacationEntryComponent},
  {path: 'systemAdmin', component: SystemAdminComponent},
  {path: 'newProject', component: NewProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
