import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListService } from '../service/employee-list.service';
import { Employee } from '../classes/employee';
import { SelectItem } from 'primeng/components/common/selectitem';

/** The workload page component in MID level. */
@Component({
  selector: 'app-workload-view',
  templateUrl: './workload-view.component.html',
  styleUrls: ['./workload-view.component.css']
})
export class WorkloadViewComponent implements OnInit {

  /** the next 6 months names */
  months: Date[];
  /** the all employeses */
  employees: Employee[];
  /** the selectable employee item in the dropdown. */
  employeesSelectItems: SelectItem[];
  /** the indicator shows if api call response is recieved */
  isDataReady:boolean;

  constructor(
    private route: ActivatedRoute,
    private employeeListService: EmployeeListService
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.isDataReady = false;
    this.months = [];
    this.employees = [];
    this.employeesSelectItems = [];
    this.getEmployees();
    this.paraEmployeeListToSelectItem();
    this.initMonths();
  }

  /** get all employess for population the dropdwon */
  getEmployees(): void {
    this.employeeListService.getAllEmployees()
      .subscribe(e => {
        this.employees = e;
        this.paraEmployeeListToSelectItem();
        this.checkDateReady();
      });
  }

  /** parsing the employee into the selecteable list item in the dropdown menu. */
  paraEmployeeListToSelectItem() {
    for (var i = 0; i < this.employees.length; i++) {
      this.employeesSelectItems.push({ label: this.employees[i].name, value: this.employees[i].name });
    }
    this.checkDateReady();
  }

  /** set next 6 months based on current date */
  private initMonths() {
    let currentM = new Date().getMonth();
    let currentY = new Date().getFullYear();
    this.months = [
      new Date(currentY, currentM),
      new Date(currentY, currentM + 1),
      new Date(currentY, currentM + 2),
      new Date(currentY, currentM + 3),
      new Date(currentY, currentM + 4),
      new Date(currentY, currentM + 5)
    ]
    this.checkDateReady();

  }

  /** check if all api response returned */
  private checkDateReady() {
    if (this.months == null)
      this.isDataReady = false;
    if (this.employeesSelectItems == null)
      this.isDataReady = false;
    this.isDataReady = true;
  }

}
