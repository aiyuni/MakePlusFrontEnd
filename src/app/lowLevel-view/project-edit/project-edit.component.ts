import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../classes/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  eventsSubject: Subject<void> = new Subject<void>();

  project: Project;
  options: FormGroup;
  isDataLoaded:boolean;
  isDataPosting:boolean;

  validated:boolean;

  formGroup: FormGroup;

  totalPhasePredicted = 0;
  totalActualPredicted = 0;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProject();
    this.isDataLoaded = false;
    this.validated=false;

    this.formGroup = new FormGroup({});
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.project = this.projectService.getProject(id);
    this.projectService.getProject(id)
      .subscribe(project => {
        this.project = new Project(project);
        console.log("current this in callback");
        console.log(this.project);
        this.isDataLoaded = true;
      });
  }

  

  submit(project:Project) {
    this.getFormValidationErrors();
    // if(this.validated)
    if(this.validated){
    this.projectService.postProject(this.project).subscribe(     
      response=> {
        console.log("response is: " + response);
        this.openSnackBar('Save Success','',4000);
        this.router.navigate(['/project/'+this.project.id]);
      });
    }
  }

  getPhaseChangedEvent(){
    this.eventsSubject.next()
  }

  getFormValidationErrors() {
    Object.keys(this.formGroup.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
        if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                this.openSnackBar(`Invalidated ${key.toString()}`,'',3000);
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
        else{
            this.validated = true;
        }
      });
    }

  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}