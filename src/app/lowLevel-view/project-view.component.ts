import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../classes/project';
import { ProjectService } from '../service/project.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})


export class ProjectViewComponent implements OnInit {

  eventsSubject: Subject<void> = new Subject<void>();
  project: Project;
  isDataLoaded: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.getProject();
    this.isDataLoaded = false;
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    //this.project = this.projectService.getProject(id);
    this.projectService.getProject(id)
      .subscribe(project => {
        this.project = new Project(project);
        console.log("current this in callback");
        console.log(this.project);
        this.isDataLoaded = true;
      });
  }


  getPhaseChangedEvent(){
  }





}
