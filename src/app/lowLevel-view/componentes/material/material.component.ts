import { Component, OnInit,Input } from '@angular/core';
import { MaterialItem } from 'src/app/classes/materialItem';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { Project } from 'src/app/classes/project';
import { Column } from 'primeng/components/common/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  eventsSubscription: any

  @Input() project:Project;
  @Input() readMode: boolean;
  @Input() material: MaterialItem[];
  @Input() phaseChangedEvent: Observable<void>;


  totalMaterialPredicted:number;
  totalMaterialActual:number;

  constructor() { }

  ngOnInit() {
    this.calcuateTotal();
    this.eventsSubscription = this.phaseChangedEvent.subscribe(() => this.calcuateTotal());
  }

  setPhaseBackgroundColor(i){
    let styles = {
      'background-color': PhaseColors.colors[i],
      'color': 'white',
      'width': '10px'

    };
    return styles;
  }


  calcuateTotal(){
    this.totalMaterialPredicted = 0;
    this.totalMaterialActual = 0;
    for(var i = 0; i < this.material.length; i++){
      this.totalMaterialPredicted += parseFloat(this.material[i].projectedBudget.toString());
      this.totalMaterialActual += parseFloat(this.material[i].actualBudget.toString());
    }
    this.updateOverviewTotal();
  }

  updateOverviewTotal(){
    this.project.materialBudget = this.totalMaterialPredicted;

    let projectTotalSalaryActual = 0;
    for(var i = 0; i < this.project.employeeSalaryList.length; i++){
      var currentEmploy = this.project.employeeSalaryList[i];
      for(var j = 0; j < currentEmploy.phaseDetailsList.length; j++){
        projectTotalSalaryActual += parseFloat(currentEmploy.phaseDetailsList[j].actualHr.toString()) * parseFloat(currentEmploy.wage.toString());
      }
    }
    this.project.spendToDate = parseFloat(this.getTotalActualMaterial().toString()) + projectTotalSalaryActual;
  }

  onEditComplete(event: {column: Column, data: any}): void {
    this.calcuateTotal();
  }

  getTotalActualMaterial(){
    let totalMaterialActual = 0;
    for(var i = 0; i < this.project.material.length; i++){
      totalMaterialActual += parseFloat(this.project.material[i].actualBudget.toString());
    }
    return totalMaterialActual;
}


  onTextEnterdInField(event: {originalEvent: any, column: Column, data: any}): void {
    this.calcuateTotal();
  }

}
