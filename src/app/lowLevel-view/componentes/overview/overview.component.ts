import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { SelectItem } from 'primeng/components/common/selectitem';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { Employee } from 'src/app/classes/employee';
import { WorkloadItem } from 'src/app/classes/workloadItem';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { PhaseDetail } from 'src/app/classes/phaseDetail';
import { BusinessCodeService } from 'src/app/service/business-code.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { BusinessCodeService } from 'src/app/service/business-Code.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  @Input() project: Project;
  @Input() readMode: boolean;
  @Input() newProjectMode:boolean;
  @Input() spendtToDate: number;
  @Input() formGroup:FormGroup;
  @Output() teamChangedEvent= new EventEmitter<any>();

  employees: Employee[];
  allEmployeeItems: SelectItem[];
  teamMemberSelected: string[] = [];
  teamLeadSelected: string[] = [];
  businessCodeOptions: string[];
  startDateCtr: FormControl;
  endDateCtr: FormControl;

  constructor(
    private employeeListService: EmployeeListService,
    private businessCodeService: BusinessCodeService,
  ) {
    this.allEmployeeItems = [];
    this.newProjectMode = false;
  }

  ngOnInit() {
    this.startDateCtr = new FormControl(this.project.startDate);
    this.endDateCtr = new FormControl(this.project.endDate);
    this.getAllEmployees();
    this.getBusinessCodes();
    this.putFormControlers();
  }


  private initTeamMembersOptions(): void {
    if (this.employees == null || this.project == null)
      return;
    for (var i = 0; i < this.employees.length; i++) {
      this.allEmployeeItems.push({ label: this.employees[i].name, value: this.employees[i].name });
    }
    for (var i = 0; i < this.project.member.length; i++) {
      this.teamMemberSelected.push(this.project.member[i].name);
    }
    for (var i = 0; i < this.project.lead.length; i++) {
      this.teamLeadSelected.push(this.project.lead[i].name);
    }
  }

  teamMemberSelectionChanged(e) {
    var id = this.findEmployeeByName(e).empID;
    let wage = this.findEmployeeByName(e).wage;
    var selectedLead = this.isSelectedLead(e);
    var selectedMember = this.isSelectedMember(e);
    if(selectedMember){
      this.addToMemberTable(id,e,wage);
    }else{
      this.removeFromMemberTable(id);
    }
    if (selectedMember && !selectedLead) {
      this.addToWorkloadTable(id, e);
      this.addToSalaryTable(id, e, wage);
      this.teamChangedEvent.emit();
    } 
    if(!selectedMember && !selectedLead) {
      this.removeFromWorkloadTable(e);
      this.removeFromSalaryTable(id);
      this.teamChangedEvent.emit();
    }
    console.log(this.project);
  }

  teamLeadSelectionChanged(e) {
    var id = this.findEmployeeByName(e).empID;
    let wage = this.findEmployeeByName(e).wage;
    var selectedLead = this.isSelectedLead(e);
    var selectedMember = this.isSelectedMember(e);
    if(selectedLead){
      this.addToLeadTable(id,e,wage);
    }else{
      this.removeFromLeadTable(id);
    }
    if (selectedLead && !selectedMember) {
      this.addToWorkloadTable(id, e);
      this.addToSalaryTable(id, e, wage);
      this.teamChangedEvent.emit();

    }
    if (!selectedLead && !selectedMember){
      this.removeFromWorkloadTable(e);
      this.removeFromSalaryTable(id);

      this.teamChangedEvent.emit();
    }
    console.log(this.project);
  }

  private isSelectedMember(name: string) {
    for (var i = 0; i < this.teamMemberSelected.length; i++) {
      if (name == this.teamMemberSelected[i])
        return true;
    }
    return false;
  }

  private isSelectedLead(name: string) {
    for (var i = 0; i < this.teamLeadSelected.length; i++) {
      if (name == this.teamLeadSelected[i])
        return true;
    }
    return false;
  }

  private addToLeadTable(id: number, name: string, wage: number){
    let temp = new Employee(id,name,wage);
    this.project.lead.push(temp);
  }
  private addToMemberTable(id: number, name: string, wage: number){
    let temp = new Employee(id,name,wage);
    this.project.member.push(temp);
  }

  private addToSalaryTable(id: number, name: string, wage: number) {
    let temp = new EmployeeSalary();
    temp.empID = id;
    temp.empName = name;
    temp.wage = wage;
    for (var j = 0; j < this.project.phaseArr.length; j++) {
      var phaseID = this.project.phaseArr[j].phaseID;
      var phaseName = this.project.phaseArr[j].name;
      temp.phaseDetailsList.push(new PhaseDetail(phaseID, phaseName, 0, 0, ""));
    }
    this.project.employeeSalaryList.push(temp);
  }
  private addToWorkloadTable(id: number, name: string) {
    let temp = new WorkloadItem(id, name, 0, 0, 0, 0, 0, 0);
    this.project.workloadArr.push(temp);
  }
  private removeFromWorkloadTable(name: string) {
    for (var i = 0; i < this.project.workloadArr.length; i++) {
      if (name == this.project.workloadArr[i].empName) {
        this.project.workloadArr.splice(i, 1);
      }
    }
  }
  private removeFromSalaryTable(id: number) {
    for (var i = 0; i < this.project.employeeSalaryList.length; i++) {
      if (id == this.project.employeeSalaryList[i].empID) {
        this.project.employeeSalaryList.splice(i, 1);
      }
    }
  }
  private removeFromLeadTable(id: number) {
    for (var i = 0; i < this.project.lead.length; i++) {
      if (id == this.project.lead[i].empID) {
        this.project.lead.splice(i, 1);
      }
    }
  }
  private removeFromMemberTable(id: number) {
    for (var i = 0; i < this.project.member.length; i++) {
      if (id == this.project.member[i].empID) {
        this.project.member.splice(i, 1);
      }
    }
  }

  private findEmployeeByName(name: string) {
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name == name)
        return this.employees[i];
    }
  }

  getAllEmployees(): void {
    this.employeeListService.getAllEmployees()
      .subscribe(employees => {
        this.employees = employees;
        console.log("all employee api get response");
        console.log(JSON.stringify(this.employees));
        this.initTeamMembersOptions();
      });
  }
  getBusinessCodes(): void {
  this.businessCodeOptions = [
    'NA',
    'K73.1/8731',
    'K74.14/8742',
    'DL33.10/3841',
    'DL33.10/3842',
    'DL33.10/3843',
    'DL3310/3845'
  ];
  }



  // From Controler

  

  recoredStoredFC = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);    
  getRecoredStoredErrorMessage() {
    this.formGroup.get
    return this.recoredStoredFC.hasError('required') ? 'You must enter a value' :
        this.recoredStoredFC.hasError('max') ? 'Maximun is 100' :
        this.recoredStoredFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  completionFC = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);     
  getCompletionErrorMessage() {
    return this.completionFC.hasError('required') ? 'You must enter a value' :
        this.completionFC.hasError('max') ? 'Maximun is 100' :
        this.completionFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  costMultiplierFC = new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]);   
  getCostMultiplierErrorMessage() {
    return this.costMultiplierFC.hasError('required') ? 'You must enter a value' :
        this.costMultiplierFC.hasError('max') ? 'Maximun is 10' :
        this.costMultiplierFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  putFormControlers(){
    this.formGroup.addControl('Record Stored Completed', this.recoredStoredFC);
    this.formGroup.addControl('Completed', this.completionFC);
    this.formGroup.addControl('Cost Multiplier', this.costMultiplierFC);
    this.formGroup.addControl('Start Date',this.startDateCtr);
    this.formGroup.addControl('End Date',this.endDateCtr);
  }

  startDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.project.startDate = event.value;
  }
  endDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.project.endDate = event.value;
  }
  
}
  





export interface BusinessCode {
  value: string;
  viewValue: string;
}