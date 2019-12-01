import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { Project } from '../classes/project';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/** The new project component in LOW level. */
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
 /** event handler for getting/recieving event */
  eventsSubject: Subject<void> = new Subject<void>();
  /** the current new project */
  project: Project;
  /** the form group that hold all from controller */
  options: FormGroup;
  /** indicator is page is submiting, and display the loading animate */
  isSubmitting:boolean;
  /** indicator is page is loading, and display the loading animate */
  isDataLoaded:boolean;
  /** the total estimated phases */
  totalPhasePredicted = 0;
  /** the total actual phases */
  totalActualPredicted = 0;
  /** the total atual salary and actual material spend */
  spendtToDate = 0;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {   }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.project = new Project(null);
    this.isDataLoaded = false;
    this.isSubmitting = false;
    this.projectService.getEmptyProject().subscribe(
      p => {
        this.project = p;
        this.projectService.getTotalProjectID()
        .subscribe(p => {
          this.project.id = p.id;
          console.log(this.project);
          this.isDataLoaded=true;
        });
      }
    );

  }

  /** submits the project */
  submit() {
    this.isSubmitting = true;
    this.projectService.postProject(this.project).subscribe(     
      response=> {
        this.projectService.postProject(this.project).subscribe(
          response => {
            console.log("response is: " + response);
            this.openSnackBar(`New project: ${this.project.name} saved successfully`,'',3000);
            this.router.navigate(['/project/'+this.project.id]);
          }
        )
      });
  }

  /** the reciever event when phase changed from other module */  
  getPhaseChangedEvent(){
    this.eventsSubject.next()
  }
  
  /** pop-up message bar. toast */
  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}