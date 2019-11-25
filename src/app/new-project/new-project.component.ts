import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { Project } from '../classes/project';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
 
  eventsSubject: Subject<void> = new Subject<void>();

  project: Project;
  options: FormGroup;
  isSubmitting:boolean;
  isDataLoaded:boolean;

  totalPhasePredicted = 0;
  totalActualPredicted = 0;
  spendtToDate = 0;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {   }

  ngOnInit() {
    this.project = new Project(null);
    this.isDataLoaded = false;
    this.isSubmitting = false;
    this.projectService.getEmptyProject().subscribe(
      p => {
        this.project = p;
        this.projectService.getTotalProjectID()
        .subscribe(p => {
          this.project.ID = p.id;
          console.log(this.project);
          this.isDataLoaded=true;
        });
      }
    );

  }

  submit() {
    this.isSubmitting = true;
    this.projectService.postProject(this.project).subscribe(     
      response=> {
        this.projectService.postProject(this.project).subscribe(
          response => {
            console.log("response is: " + response);
            this.openSnackBar(`New project: ${this.project.Name} saved successfully`,'',3000);
            this.router.navigate(['/project/'+this.project.ID]);
          }
        )
      });
  }

  getPhaseChangedEvent(){
    this.eventsSubject.next()
  }

  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}