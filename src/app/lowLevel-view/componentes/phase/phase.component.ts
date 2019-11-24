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
  }

  private parsDateFromStrToDate(dateStr: string) {
    return new Date(dateStr);
  }

  save() {
    if(this.startTempDateCtr.status=="INVALID" || this.endTempDateCtr.status=="INVALID"){
      console.log(this.startTempDateCtr);
      console.log(this.endTempDateCtr);
      this.openSnackBar('Invalidated dates','',2000);
      return;
    }
    this.phase.startDate = this.startTempDateCtr.value.toISOString();
    this.phase.endDate = this.endTempDateCtr.value.toString();
    if (this.newPhase) {
      this.projectService.getNextPhaseID()
      .subscribe(p => {
      var phaseID = p;
      this.phase.phaseID = p;
      this.phases.push(this.phase);
      this.addToMaterialTable(phaseID);
      this.addToSalaryTable(phaseID);
      });
    }
    else
      this.phases[this.phases.indexOf(this.selectedPhase)] = this.phase;

    this.phase = null;
    this.displayDialog = false;
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
    this.displayDialog = true;
    this.startTempDateCtr = new FormControl(new Date());
    this.endTempDateCtr = new FormControl(new Date());
  }

  setPhaseBackgroundColor(i) {
    let styles = {
      'background-color': PhaseColors.colors[i],
      'color': 'white',
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
