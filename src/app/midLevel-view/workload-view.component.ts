import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListService } from '../service/employee-list.service';
import { Employee } from '../classes/employee';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-workload-view',
  templateUrl: './workload-view.component.html',
  styleUrls: ['./workload-view.component.css']
})
export class WorkloadViewComponent implements OnInit {

  months: Date[];
  employees: Employee[];
  employeesSelectItems: SelectItem[];
  isDataReady:boolean;


  constructor(
    private route: ActivatedRoute,
    private employeeListService: EmployeeListService
  ) { }

  ngOnInit() {
    this.isDataReady = false;
    this.months = [];
    this.employees = [];
    this.employeesSelectItems = [];
    this.getEmployees();
    this.paraEmployeeListToSelectItem();
    this.initMonths();
  }


  getEmployees(): void {
    this.employeeListService.getAllEmployees()
      .subscribe(e => {
        this.employees = e;
        this.paraEmployeeListToSelectItem();
        this.checkDateReady();
      });
  }

  paraEmployeeListToSelectItem() {
    for (var i = 0; i < this.employees.length; i++) {
      this.employeesSelectItems.push({ label: this.employees[i].name, value: this.employees[i].name });
    }
    this.checkDateReady();
  }

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

  private checkDateReady() {
    if (this.months == null)
      this.isDataReady = false;
    if (this.employeesSelectItems == null)
      this.isDataReady = false;
      this.isDataReady = true;
  }

}
