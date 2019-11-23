import { Component, OnInit,Input } from '@angular/core';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { Column } from 'primeng/components/common/shared';
import { Project } from 'src/app/classes/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salary-individual',
  templateUrl: './salary-individual.component.html',
  styleUrls: ['./salary-individual.component.css']
})
export class SalaryIndividualComponent implements OnInit {
  eventsSubscription: any

  @Input() employeeSalary:EmployeeSalary;
  @Input() readMode:boolean;
  @Input() project:Project;
  @Input() phaseChangeListener: Observable<void>;

  projectTotalSalaryBugetHr:number;
  projectTotalSalaryActualHr:number;

  constructor() { }

  ngOnInit() {
    this.calcuateTotal();
    this.eventsSubscription = this.phaseChangeListener.subscribe(() => this.calcuateTotal());
  }

  setPhaseBackgroundColor(i){
    let styles = {
      'background-color': PhaseColors.colors[i],
      'color': 'white',
    };
    return styles;
  }

  calcuateTotal(){
    this.projectTotalSalaryBugetHr = 0;
    this.projectTotalSalaryActualHr = 0;
    for(var i = 0; i < this.employeeSalary.phaseDetailsList.length; i++){
      this.projectTotalSalaryBugetHr += parseFloat(this.employeeSalary.phaseDetailsList[i].budgetHr.toString());
      this.projectTotalSalaryActualHr += parseFloat(this.employeeSalary.phaseDetailsList[i].actualHr.toString());
    }
    this.updateProjectOverview();
  }


  onEditComplete(event: {column: Column, data: any}): void {
    this.calcuateTotal();
  }


  onTextEnterdInField(event: {originalEvent: any, column: Column, data: any}): void {
    this.calcuateTotal();
  }

  updateProjectOverview(){
    let projectTotalSalaryBuget  = 0;
    let projectTotalSalaryActual = 0;
    for(var i = 0; i < this.project.employeeSalaryList.length; i++){
      var currentEmploy = this.project.employeeSalaryList[i];
      for(var j = 0; j < currentEmploy.phaseDetailsList.length; j++){
        projectTotalSalaryBuget += parseFloat(currentEmploy.phaseDetailsList[j].budgetHr.toString()) * parseFloat(currentEmploy.wage.toString());
        projectTotalSalaryActual += parseFloat(currentEmploy.phaseDetailsList[j].actualHr.toString()) * parseFloat(currentEmploy.wage.toString());
      }
    }
    this.project.salaryBudget = projectTotalSalaryBuget;
    this.project.spendToDate = parseFloat(this.getTotalActualMaterial().toString()) + projectTotalSalaryActual;
  }


  getTotalActualMaterial(){
      let totalMaterialActual = 0;
      for(var i = 0; i < this.project.material.length; i++){
        totalMaterialActual += parseFloat(this.project.material[i].actualBudget.toString());
      }
      return totalMaterialActual;
  }

}
