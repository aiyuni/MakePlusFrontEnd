import { Component, OnInit,Input } from '@angular/core';
import { MaterialItem } from 'src/app/classes/materialItem';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { Project } from 'src/app/classes/project';
import { Column } from 'primeng/components/common/shared';
import { Observable } from 'rxjs';

/** The calendar component in LOW level view. */
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  eventsSubscription: any
  /** the current project */
  @Input() project:Project;
  /** indicator if this page is read only or not. */
  @Input() readMode: boolean;
  /** each row of the material table. */
  @Input() material: MaterialItem[];
  /** the input event when other module add phase */
  @Input() phaseChangedEvent: Observable<void>;

  /** the total material estimates */
  totalMaterialPredicted:number;
  /** the total material actual amount. */
  totalMaterialActual:number;

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.calcuateTotal();
    this.eventsSubscription = this.phaseChangedEvent.subscribe(() => this.calcuateTotal());
  }

  /** applying the phase color to the phase number. */
  setPhaseBackgroundColor(i){
    let styles = {
      'color': PhaseColors.colors[i],
      'font-weight': 'bold',
      'width': '10px'
    };
    return styles;
  }

  /** summing all the material amount */
  calcuateTotal(){
    this.totalMaterialPredicted = 0;
    this.totalMaterialActual = 0;
    for(var i = 0; i < this.material.length; i++){
      this.totalMaterialPredicted += parseFloat(this.material[i].projectedBudget.toString());
      this.totalMaterialActual += parseFloat(this.material[i].actualBudget.toString());
    }
    this.updateOverviewTotal();
  }

  /** update the project overview material amount */
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

  /** fired when user exit the field */
  onEditComplete(event: {column: Column, data: any}): void {
    this.calcuateTotal();
  }

  /** summing all atual material spend. */
  getTotalActualMaterial(){
    let totalMaterialActual = 0;
    for(var i = 0; i < this.project.material.length; i++){
      totalMaterialActual += parseFloat(this.project.material[i].actualBudget.toString());
    }
    return totalMaterialActual;
}

/** fired when user change the text of the field. */
  onTextEnterdInField(event: {originalEvent: any, column: Column, data: any}): void {
    this.calcuateTotal();
  }

}
