import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../classes/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/** The project edit component in LOW level. */
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  /** event handler for getting/recieving event */
  eventsSubject: Subject<void> = new Subject<void>();

  /** current project */
  project: Project;
  /** the form group */
  options: FormGroup;
  /** the indicator shows if api call response is recieved */
  isDataLoaded:boolean;
  /** the indicator shows if the data is posting */
  isDataPosting:boolean;
  /** the indicator shows if the data is submitting and waiting response. */
  isSubmitting:boolean;
  /** the indicator shows if this page is verified. */
  validated:boolean;
  /** the form group for all the controller(validation purpose.) */
  formGroup: FormGroup;

  /** the total phase estimates in weeks */
  totalPhasePredicted = 0;
  /** the total phase actual in weeks */
  totalActualPredicted = 0;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.getProject();
    this.isDataLoaded = false;
    this.validated=false;
    this.isSubmitting=false;
    this.formGroup = new FormGroup({});
  }

  /** get project by url project id */
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

  /** submits the project */
  submit(project:Project) {
    this.isSubmitting = true;
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

  /** the reciever event when phase changed from other module */
  getPhaseChangedEvent(){
    this.eventsSubject.next()
  }

  /** get the form (all) validation erros */
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

  /** pop-up message bar. toast */
  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}