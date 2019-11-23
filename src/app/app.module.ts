import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {SliderModule} from 'primeng/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { SlidenavComponent } from './slidenav/slidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PickListModule } from 'primeng/picklist';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { CheckboxModule } from 'primeng/checkbox';

import { ProjectViewComponent } from './lowLevel-view/project-view.component';

import { HighlevelViewComponent } from './highlevel-view/highlevel-view.component';
import {MatRadioModule} from '@angular/material/radio';

import {MatStepperModule} from '@angular/material/stepper';


import { CalendarComponent } from './lowLevel-view/componentes/calendar/calendar.component';
import { InvoiceComponent } from './lowLevel-view/componentes/invoice/invoice.component';
import { ProjectEditComponent } from './lowLevel-view/project-edit/project-edit.component';
import { MatNativeDateModule } from '@angular/material/core';
import { OverviewComponent } from './lowLevel-view/componentes/overview/overview.component';
import { WorkloadComponent } from './lowLevel-view/componentes/workload/workload.component';
import { PhaseComponent } from './lowLevel-view/componentes/phase/phase.component';
import { PhaseTrackingComponent } from './lowLevel-view/componentes/phase-tracking/phase-tracking.component';
import { MaterialComponent } from './lowLevel-view/componentes/material/material.component';
import { SalaryIndividualComponent } from './lowLevel-view/componentes/salary-individual/salary-individual.component';
import { SalaryComponent } from './lowLevel-view/componentes/salary/salary.component';
import { WorkloadTableComponent } from './midLevel-view/component/workload-table/workload-table.component';
import { WorkloadViewComponent } from './midLevel-view/workload-view.component';
import { AllProjectsTableComponent } from './highlevel-view/all-projects-table/all-projects-table.component';
import { AllProposalTableComponent } from './highlevel-view/all-proposal-table/all-proposal-table.component';
import { CommonModule } from '@angular/common';
import { VacationEntryComponent } from './VacationEntry/vacation-entry/vacation-entry.component';
import { SystemAdminComponent } from './SystemAdmin/system-admin/system-admin.component';
import { VacationTableComponent } from './midLevel-view/component/vacation-table/vacation-table.component';
import { NewProjectComponent } from './new-project/new-project.component';


@NgModule({
  declarations: [
    AppComponent,
    SlidenavComponent,
    ProjectViewComponent,
    WorkloadViewComponent,
    HighlevelViewComponent,
    CalendarComponent,
    InvoiceComponent,
    ProjectEditComponent,
    OverviewComponent,
    WorkloadComponent,
    PhaseComponent,
    PhaseTrackingComponent,
    MaterialComponent,
    SalaryIndividualComponent,
    SalaryComponent,
    WorkloadTableComponent,
    AllProjectsTableComponent,
    AllProposalTableComponent,
    VacationEntryComponent,
    SystemAdminComponent,
    VacationTableComponent,
    NewProjectComponent,

  ],
  imports: [
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    TableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    CalendarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CheckboxModule,MatTabsModule,MatButtonToggleModule,MatStepperModule,MatRadioModule,
    PickListModule, MultiSelectModule, DialogModule,SliderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
