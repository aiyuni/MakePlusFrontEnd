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

/** The invoice component in LOW level view. */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  /** current project. */
  @Input() project: Project;
  /** indicator if this page is read only or not. */
  @Input() readMode: boolean;
  /** indicator if this project is new or not. */
  @Input() newProjectMode:boolean;
  /** the total spend to date. */
  @Input() spendtToDate: number;
  /** the form controller group */
  @Input() formGroup:FormGroup;
  /** pass event to other module when team member change */
  @Output() teamChangedEvent= new EventEmitter<any>();

  /** all employees in thie project. */
  employees: Employee[];
  /** all employees selection items in the drop down menu. */
  allEmployeeItems: SelectItem[];
  /** the selected row from the team dropdown. */
  teamMemberSelected: string[] = [];
  /** the selected row from the lead dropdown. */
  teamLeadSelected: string[] = [];
  /** the selection items in the business code dropdown. */
  businessCodeOptions: string[];
  /** start date controller */
  startDateCtr: FormControl;
  /** end date controller. */
  endDateCtr: FormControl;


  constructor(
    private employeeListService: EmployeeListService,
    private businessCodeService: BusinessCodeService,
  ) {
    this.allEmployeeItems = [];
    this.newProjectMode = false;
  }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.startDateCtr = new FormControl(this.project.startDate);
    this.endDateCtr = new FormControl(this.project.endDate);
    this.getAllEmployees();
    this.getBusinessCodes();
    this.putFormControlers();
  }

  /** populate team menbmer option into selection items. */
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

  /** fired when team selection list changed. */
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

  /** fired when lead selection changed. */
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

  /** state if the member is selected already or not. */
  private isSelectedMember(name: string) {
    for (var i = 0; i < this.teamMemberSelected.length; i++) {
      if (name == this.teamMemberSelected[i])
        return true;
    }
    return false;
  }

  /** state if the member is selected already or not. */
  private isSelectedLead(name: string) {
    for (var i = 0; i < this.teamLeadSelected.length; i++) {
      if (name == this.teamLeadSelected[i])
        return true;
    }
    return false;
  }

  /** saving the lead selection to project lead arr. */
  private addToLeadTable(id: number, name: string, wage: number){
    let temp = new Employee(id,name,wage);
    this.project.lead.push(temp);
  }

  /** saving the member selection to project member arr. */
  private addToMemberTable(id: number, name: string, wage: number){
    let temp = new Employee(id,name,wage);
    this.project.member.push(temp);
  }

  /** add new selection employee to salary table. */
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
  /** add new selection employee to workload table. */
  private addToWorkloadTable(id: number, name: string) {
    let temp = new WorkloadItem(id, name, 0, 0, 0, 0, 0, 0);
    this.project.workloadArr.push(temp);
  }
  /** remove selection employee from workload table. */
  private removeFromWorkloadTable(name: string) {
    for (var i = 0; i < this.project.workloadArr.length; i++) {
      if (name == this.project.workloadArr[i].empName) {
        this.project.workloadArr.splice(i, 1);
      }
    }
  }
  /** remove selection employee from salary table. */
  private removeFromSalaryTable(id: number) {
    for (var i = 0; i < this.project.employeeSalaryList.length; i++) {
      if (id == this.project.employeeSalaryList[i].empID) {
        this.project.employeeSalaryList.splice(i, 1);
      }
    }
  }
  /** remove selection employee from lead in the project. */
  private removeFromLeadTable(id: number) {
    for (var i = 0; i < this.project.lead.length; i++) {
      if (id == this.project.lead[i].empID) {
        this.project.lead.splice(i, 1);
      }
    }
  }
  /** remove selection employee from member in the project. */
  private removeFromMemberTable(id: number) {
    for (var i = 0; i < this.project.member.length; i++) {
      if (id == this.project.member[i].empID) {
        this.project.member.splice(i, 1);
      }
    }
  }

  /** find the name is the employee is in the project employees(lead and members). */
  private findEmployeeByName(name: string) {
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name == name)
        return this.employees[i];
    }
  }

  /** get all employee for populating employee selection dropdown. */
  getAllEmployees(): void {
    this.employeeListService.getAllEmployees()
      .subscribe(employees => {
        this.employees = employees;
        console.log("all employee api get response");
        console.log(JSON.stringify(this.employees));
        this.initTeamMembersOptions();
      });
  }
  /** hardcoded business code selection. */
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
  /** recorded stored field control */
  recoredStoredFC = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);    
  /** returen the validator result string */
  getRecoredStoredErrorMessage() {
    this.formGroup.get
    return this.recoredStoredFC.hasError('required') ? 'You must enter a value' :
        this.recoredStoredFC.hasError('max') ? 'Maximun is 100' :
        this.recoredStoredFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  /** completion field control */
  completionFC = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);     
  /** returen the validator result string */
  getCompletionErrorMessage() {
    return this.completionFC.hasError('required') ? 'You must enter a value' :
        this.completionFC.hasError('max') ? 'Maximun is 100' :
        this.completionFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  /** cost multiplier field control */
  costMultiplierFC = new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]);   
  /** returen the validator result string */
  getCostMultiplierErrorMessage() {
    return this.costMultiplierFC.hasError('required') ? 'You must enter a value' :
        this.costMultiplierFC.hasError('max') ? 'Maximun is 10' :
        this.costMultiplierFC.hasError('min') ? 'Minimun is 0' :
          '';
  }
  /** add form controller to form group. */
  putFormControlers(){
    this.formGroup.addControl('Record Stored Completed', this.recoredStoredFC);
    this.formGroup.addControl('Completed', this.completionFC);
    this.formGroup.addControl('Cost Multiplier', this.costMultiplierFC);
    this.formGroup.addControl('Start Date',this.startDateCtr);
    this.formGroup.addControl('End Date',this.endDateCtr);
  }

  /** start date change event */
  startDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.project.startDate = event.value;
  }
  /** end date change event */
  endDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.project.endDate = event.value;
  }
  
}
  





export interface BusinessCode {
  value: string;
  viewValue: string;
}