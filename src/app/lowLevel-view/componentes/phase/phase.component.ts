import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhaseItem } from 'src/app/classes/phaseItem';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { MaterialItem } from 'src/app/classes/materialItem';
import { Project } from 'src/app/classes/project';
import { PhaseDetail } from 'src/app/classes/phaseDetail';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  @Input() phases: PhaseItem[];
  @Input() readMode: boolean;
  @Input() project: Project;
  @Input() formGroup:FormGroup;
  @Output() phaseChangedEvent= new EventEmitter<any>();

  startTempDateCtr = new FormControl(new Date());
  endTempDateCtr = new FormControl(new Date());


  displayedColumns: string[] = ['Name', 'Start Date', 'End Date', 'Records'];
  cols: any[];
  phase: PhaseItem;
  newPhase: boolean;
  selectedPhase: PhaseItem;
  displayDialog: boolean;
  today: Date;
  phaseCounter:number;

  constructor(  
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'recordDone', header: 'Record' }
    ];
    this.phaseCounter = 0;
  }
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
      // this.projectService.getTotalPhaseID()
      // .subscribe(p => {
      //   console.log(this.phase);
      //   console.log(p);
      //   var phaseID = p.id + (this.phaseCounter++);
      this.phases.push(this.phase);

      this.addToMaterialTable(this.phase.phaseID);
      this.addToSalaryTable(this.phase.phaseID);
      this.openSnackBar(`New phase ${this.phase.name} added.`,'',3000);
      this.phase = null;
      this.displayDialog = false;
      // });
    }
    else{
      this.phases[this.phases.indexOf(this.selectedPhase)] = this.phase;
      this.openSnackBar(`Phase ${this.phase.name} updated.`,'',3000);
      this.phase = null;
      this.displayDialog = false;
    }
    
  }

  private addToSalaryTable(id:number) {
    var phaseName = this.phase.name;
    // let temp = new PhaseDetail(id, phaseName, 0, 0, "");
    for(var i = 0; i < this.project.employeeSalaryList.length;i++){
      let temp = new PhaseDetail(id, phaseName, 0, 0, "");
      this.project.employeeSalaryList[i].phaseDetailsList.push(temp);
    }
  }

  private addToMaterialTable(id:number) {
    let temp = new MaterialItem(id, this.phase.name, 0, 0, ""); 
    this.project.material.push(temp)
  }


  private removeMaterialTable(id: number) {
    for (var i = 0; i < this.project.material.length; i++) {
      if (id == this.project.material[i].phaseID) {
        this.project.material.splice(i, 1);
      }
    }
  }


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
  private removePhasesTable(id: number) {
    for (var i = 0; i < this.project.phaseArr.length; i++) {
      if (id == this.project.phaseArr[i].phaseID) {
        this.project.phaseArr.splice(i, 1);
      }
    }
  }
  private removeFromSalaryTable(id: number) {
    for(var i = 0; i < this.project.employeeSalaryList.length;i++){
      for(var j = 0; j<this.project.employeeSalaryList[i].phaseDetailsList.length;j++){
        if (id == this.project.employeeSalaryList[i].phaseDetailsList[j].phaseID) {
          this.project.employeeSalaryList[i].phaseDetailsList.splice(j, 1);
        }
      }
    }
  }
  onRowSelect(event) {
    this.newPhase = false;
    this.phase = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  cloneCar(p: PhaseItem): any {
    let phase = {};
    console.log(p);
    console.log(phase);
    for (let prop in p) {
      phase[prop] = p[prop];
    }
    return phase;
  }
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
    this.startTempDateCtr = new FormControl(new Date());
    this.endTempDateCtr = new FormControl(new Date());
  }

  setPhaseBackgroundColor(i) {
    let styles = {
      'color': PhaseColors.colors[i],
      'font-weight': 'bold',
      'width': '10px'
    };
    return styles;
  }
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


  openSnackBar(message: string, action: string, duration:number) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
