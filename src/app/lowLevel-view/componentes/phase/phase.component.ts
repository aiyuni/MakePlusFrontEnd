import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhaseItem } from 'src/app/classes/phaseItem';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { MaterialItem } from 'src/app/classes/materialItem';
import { Project } from 'src/app/classes/project';
import { PhaseDetail } from 'src/app/classes/phaseDetail';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/** The phase component in LOW level view. */
@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  /** each row in the phase table */
  @Input() phases: PhaseItem[];
  /** indicator if this page is read only or not. */
  @Input() readMode: boolean;
  /** the current project in this page */
  @Input() project: Project;
  /** the from group of this page for validator purpose. */
  @Input() formGroup:FormGroup;
  /** passing phase change event to other module. */
  @Output() phaseChangedEvent= new EventEmitter<any>();

  /** the start date controller */
  startTempDateCtr = new FormControl(new Date());
  /** the end date controller */
  endTempDateCtr = new FormControl(new Date());

  /** the column names. */
  displayedColumns: string[] = ['Name', 'Start Date', 'End Date', 'Records'];
  /** table column headers names apply sorting function. */
  cols: any[];
  /** the current selected or new phase item */
  phase: PhaseItem;
  /** indicator if current phase is new or not */
  newPhase: boolean;
  /** the selected phase from the table row. */
  selectedPhase: PhaseItem;
  /** showing the dialog or not */
  displayDialog: boolean;
  /** the default phase date. */
  today: Date;
  /** the new phased added counter. */
  phaseCounter:number;

  constructor(  
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
    ) { }
  /** Initialize the directive/component. */
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'recordDone', header: 'Record' }
    ];
    this.phaseCounter = 0;
  }
  /** saving the data in the dialog window. */
  save() {
    if(this.startTempDateCtr.status=="INVALID" || this.endTempDateCtr.status=="INVALID"){
      console.log(this.startTempDateCtr);
      console.log(this.endTempDateCtr);
      this.openSnackBar('Invalidated dates','',3000);
      return;
    }
    this.phase.startDate = this.startTempDateCtr.value.toISOString();
    this.phase.endDate = this.endTempDateCtr.value.toISOString();
    if (this.newPhase) {
      this.phases.push(this.phase);

      this.addToMaterialTable(this.phase.phaseID);
      this.addToSalaryTable(this.phase.phaseID);
      this.openSnackBar(`New phase ${this.phase.name} added.`,'',3000);
      this.phase = null;
      this.displayDialog = false;
    }
    else{
      this.phases[this.phases.indexOf(this.selectedPhase)] = this.phase;
      this.openSnackBar(`Phase ${this.phase.name} updated.`,'',3000);
      this.phase = null;
      this.displayDialog = false;
    }
    
  }

  /** add new phase to salary table. */
  private addToSalaryTable(id:number) {
    var phaseName = this.phase.name;
    for(var i = 0; i < this.project.employeeSalaryList.length;i++){
      let temp = new PhaseDetail(id, phaseName, 0, 0, "");
      this.project.employeeSalaryList[i].phaseDetailsList.push(temp);
    }
  }

  /** add new phase to material table. */
  private addToMaterialTable(id:number) {
    let temp = new MaterialItem(id, this.phase.name, 0, 0, ""); 
    this.project.material.push(temp)
  }

  /** remove the phase from material table. */
  private removeMaterialTable(id: number) {
    for (var i = 0; i < this.project.material.length; i++) {
      if (id == this.project.material[i].phaseID) {
        this.project.material.splice(i, 1);
      }
    }
  }

  /** delete the phase */
  delete() {
    let targetID = this.selectedPhase.phaseID;
    let index = this.phases.indexOf(this.selectedPhase);
    this.phases = this.phases.filter((val, i) => i != index);
    this.phase = null;
    this.displayDialog = false;
    this.removeMaterialTable(targetID);
    this.removePhasesTable(targetID);
    this.removeFromSalaryTable(targetID);
    this.phaseChangedEvent.emit();
    this.openSnackBar(`Phase ${this.selectedPhase.name} removed.`,'',3000);
  }

  /** remove phase from phase table */
  private removePhasesTable(id: number) {
    for (var i = 0; i < this.project.phaseArr.length; i++) {
      if (id == this.project.phaseArr[i].phaseID) {
        this.project.phaseArr.splice(i, 1);
      }
    }
  }
  /** remove phase from salary table. */
  private removeFromSalaryTable(id: number) {
    for(var i = 0; i < this.project.employeeSalaryList.length;i++){
      for(var j = 0; j<this.project.employeeSalaryList[i].phaseDetailsList.length;j++){
        if (id == this.project.employeeSalaryList[i].phaseDetailsList[j].phaseID) {
          this.project.employeeSalaryList[i].phaseDetailsList.splice(j, 1);
        }
      }
    }
  }
  /** fired event when user select a row. */
  onRowSelect(event) {
    this.newPhase = false;
    this.phase = this.cloneCar(event.data);
    this.displayDialog = true;
    this.startTempDateCtr = new FormControl(this.phase.startDate);
    this.endTempDateCtr = new FormControl(this.phase.endDate);
  }
  /** deep copying the phase to phase */
  cloneCar(p: PhaseItem): any {
    let phase = {};
    console.log(p);
    console.log(phase);
    for (let prop in p) {
      phase[prop] = p[prop];
    }
    return phase;
  }
  /** fired when user clicks rows or add btn. */
  showDialogToAdd() {
    this.newPhase = true;
    this.phase = new PhaseItem(1, "", new Date(), new Date(),0,0,""); //TODO: The ID should be fixed

    this.projectService.getTotalPhaseID()
      .subscribe(p => {
        console.log(p);
        var phaseID = p.id + (this.phaseCounter);
        this.phaseCounter++;
        this.phase.phaseID = phaseID;
        console.log("phase id updated.");
        console.log(this.phase);
    });
    this.displayDialog = true;
    this.startTempDateCtr = new FormControl(this.phase.startDate);
    this.endTempDateCtr = new FormControl(this.phase.endDate);
  }

  /** applying phase color */
  setPhaseBackgroundColor(i) {
    let styles = {
      'color': PhaseColors.colors[i],
      'font-weight': 'bold',
      'width': '10px'
    };
    return styles;
  }
  /** applying phase color & text. */
  setPhaseBackgroundColorIcon(i) {
    let styles = {
      'display': 'inline-block',
      'background-color': PhaseColors.colors[i],
      'color': 'white',
      'width': '12px',
      'height': '12px',
    };
    return styles;
  }

  /** the pop-up tost message. */
  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
