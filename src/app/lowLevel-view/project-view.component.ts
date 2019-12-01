import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../classes/project';
import { ProjectService } from '../service/project.service';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

/** The project component in LOW level. */
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})

export class ProjectViewComponent implements OnInit {
  /** event handler for getting/recieving event */
  eventsSubject: Subject<void> = new Subject<void>();
  /** current project */
  project: Project;
  /** the indicator shows if api call response is recieved */
  isDataLoaded: boolean;
  /** the form group that holds all form controller */
  formGroup: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.getProject();
    this.isDataLoaded = false;
    
    this.formGroup = new FormGroup({});
  }

  /** get project by url project id */
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

  /** recieve for the phase changed event.
   * Empty for this page. 
  */
  getPhaseChangedEvent(){}





}
