import { Component, OnInit,Input } from '@angular/core';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { Column } from 'primeng/components/common/shared';
import { Project } from 'src/app/classes/project';
import { Observable } from 'rxjs';

/** The salary details component in LOW level view. */
@Component({
  selector: 'app-salary-individual',
  templateUrl: './salary-individual.component.html',
  styleUrls: ['./salary-individual.component.css']
})
export class SalaryIndividualComponent implements OnInit {
  eventsSubscription: any
  /** employee index in the project employee array. */
  @Input() empIndex:number;
  /** current employee */
  @Input() employeeSalary:EmployeeSalary;
  /** indicator if this page is read only or not. */
  @Input() readMode:boolean;
  /** current project */
  @Input() project:Project;
  /** reciever of phased changed event from other module. */
  @Input() phaseChangeListener: Observable<void>;

  /** total salary budget estimated hours */
  projectTotalSalaryBugetHr:number;
  /** total salary budget actual hours */
  projectTotalSalaryActualHr:number;

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.calcuateTotal();
    this.eventsSubscription = this.phaseChangeListener.subscribe(() => this.calcuateTotal());
    console.log(this.empIndex);
  }

  /** applying phase color based on phase index */
  setPhaseBackgroundColor(i){
    let styles = {
      'color': PhaseColors.colors[i],
      'font-weight': 'bold',
      'width': '10px'
    };
    return styles;
  }

  /** calculate totoal salary */
  calcuateTotal(){
    this.projectTotalSalaryBugetHr = 0;
    this.projectTotalSalaryActualHr = 0;
    for(var i = 0; i < this.employeeSalary.phaseDetailsList.length; i++){
      this.projectTotalSalaryBugetHr += parseFloat(this.employeeSalary.phaseDetailsList[i].budgetHr.toString());
      this.projectTotalSalaryActualHr += parseFloat(this.employeeSalary.phaseDetailsList[i].actualHr.toString());
    }
    this.updateProjectOverview();
    console.log(this.project);
  }

  /** fired when user exits field */
  onEditComplete(event: {column: Column, data: any}): void {
    this.calcuateTotal();
  }

  /** fired when text changed */
  onTextEnterdInField(event: {originalEvent: any, column: Column, data: any}): void {
    this.calcuateTotal();
  }

  /** update project overview module.(project level.) */
  updateProjectOverview(){
    let projectTotalSalaryBuget  = 0;
    let projectTotalSalaryActual = 0;
    for(var i = 0; i < this.project.employeeSalaryList.length; i++){
      var currentEmploy = this.project.employeeSalaryList[i];
      for(var j = 0; j < currentEmploy.phaseDetailsList.length; j++){
        projectTotalSalaryBuget += parseFloat(currentEmploy.phaseDetailsList[j].budgetHr.toString()) * parseFloat(currentEmploy.wage.toString()) * parseFloat(this.project.costMultiplier.toString());
        projectTotalSalaryActual += parseFloat(currentEmploy.phaseDetailsList[j].actualHr.toString()) * parseFloat(currentEmploy.wage.toString()) * parseFloat(this.project.costMultiplier.toString());
      }
    }
    this.project.salaryBudget = projectTotalSalaryBuget;
    this.project.spendToDate = parseFloat(this.getTotalActualMaterial().toString()) + projectTotalSalaryActual;
  }

  /** get total material actual amount. */
  getTotalActualMaterial(){
      let totalMaterialActual = 0;
      for(var i = 0; i < this.project.material.length; i++){
        totalMaterialActual += parseFloat(this.project.material[i].actualBudget.toString());
      }
      return totalMaterialActual;
  }

}
